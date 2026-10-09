import io
import re
import json
import argparse
from pathlib import Path
from datetime import datetime, timezone
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor, as_completed

from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "public" / "directory-previews"
REPORT = ROOT / "ai" / "research" / "directory-preview-sources.json"
HEADERS = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36"}


class PreviewParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.images = {}

    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == "meta":
            name = (attributes.get("property") or attributes.get("name") or "").lower()
            if name in ("og:image:secure_url", "og:image", "twitter:image", "twitter:image:src"):
                self.images.setdefault(name, attributes.get("content", ""))
        if tag == "link" and attributes.get("rel") == "image_src":
            self.images.setdefault("image_src", attributes.get("href", ""))


def read_entries():
    source = (ROOT / "src" / "shared" / "catalog" / "catalog.ts").read_text(encoding="utf-8-sig")
    source = source.split("export const directories:", 1)[1].split("export const linkedDirectories", 1)[0]
    entries = {}
    for block in re.findall(r"\{([^{}]+)\}", source):
        values = dict(re.findall(r"\b(id|name|href):\s*`([^`]+)`", block))
        if values.get("id") and values.get("href"):
            entries[values["id"]] = values
    for suffix in ("a", "b"):
        additions = ROOT / "ai" / "research" / f"directory-additions-{suffix}.json"
        if additions.exists():
            for entry in json.loads(additions.read_text(encoding="utf-8-sig")):
                entries.setdefault(entry["id"], entry)
    return list(entries.values())


def request_bytes(url, limit, timeout):
    with urlopen(Request(url, headers=HEADERS), timeout=timeout) as response:
        data = response.read(limit + 1)
        if len(data) > limit:
            raise ValueError("Response Exceeds Preview Size Limit")
        return data, response.geturl(), response.headers.get("Content-Type", "")


def save_image(data, entry_id):
    with Image.open(io.BytesIO(data)) as image:
        image.seek(0)
        if image.width < 250 or image.height < 120:
            raise ValueError("Image Too Small For Banner")
        image = image.convert("RGBA" if "transparency" in image.info else "RGB") if image.mode not in ("RGB", "RGBA") else image.copy()
        image.thumbnail((960, 960), Image.Resampling.LANCZOS)
        image.save(OUTPUT / f"{entry_id}.webp", "WEBP", quality=82, method=6)


def collect(entry, existing, screenshots, retry):
    entry_id = entry["id"]
    asset = OUTPUT / f"{entry_id}.webp"
    if existing and existing.get("rejectedReason") and not retry:
        return existing
    if existing and asset.exists() and existing.get("href") == entry["href"]:
        return existing
    record = {"id": entry_id, "href": entry["href"], "checkedAt": datetime.now(timezone.utc).isoformat(timespec="seconds")}
    errors = []
    try:
        html, final_url, content_type = request_bytes(entry["href"], 3 * 1024 * 1024, 18)
        parser = PreviewParser()
        parser.feed(html.decode("utf-8", errors="replace"))
        for key in ("og:image:secure_url", "og:image", "twitter:image", "twitter:image:src", "image_src"):
            candidate = urljoin(final_url, parser.images.get(key, ""))
            if not parser.images.get(key) or urlparse(candidate).scheme not in ("http", "https"):
                continue
            try:
                image, image_url, _ = request_bytes(candidate, 10 * 1024 * 1024, 18)
                save_image(image, entry_id)
                return {**record, "kind": key, "sourceUrl": final_url, "imageUrl": image_url, "previewImage": f"/directory-previews/{entry_id}.webp"}
            except Exception as error:
                errors.append(f"{key}: {error}")
    except Exception as error:
        errors.append(str(error))
    if screenshots:
        screenshot_url = f"https://image.thum.io/get/noanimate/width/960/crop/675/{entry['href']}"
        try:
            image, _, _ = request_bytes(screenshot_url, 10 * 1024 * 1024, 60)
            save_image(image, entry_id)
            return {**record, "kind": "screenshot", "sourceUrl": entry["href"], "imageUrl": screenshot_url, "previewImage": f"/directory-previews/{entry_id}.webp"}
        except Exception as error:
            errors.append(f"Screenshot: {error}")
    return {**record, "kind": "unavailable", "errors": errors[-3:]}


def update_preview_references(records):
    catalog_path = ROOT / "src" / "shared" / "catalog" / "catalog.ts"
    source = catalog_path.read_text(encoding="utf-8-sig")
    array_start = source.index("export const directories:")
    array_end = source.index("\n];", array_start)
    previews = {record["id"]: record["previewImage"] for record in records if record.get("previewImage") and (ROOT / "public" / record["previewImage"].lstrip("/")).exists()}

    def update_entry(match):
        block = re.sub(r"        previewImage: `[^`]+`,\n", "", match.group(0))
        entry_id = re.search(r"\bid:\s*`([^`]+)`", block).group(1)
        if entry_id not in previews:
            return block
        return re.sub(r"(        href: `[^`]+`,\n)", lambda href: href.group(1) + f"        previewImage: `{previews[entry_id]}`,\n", block, count=1)

    updated = source[:array_start] + re.sub(r"    \{[^{}]+\},", update_entry, source[array_start:array_end]) + source[array_end:]
    if updated != source:
        catalog_path.write_text(updated, encoding="utf-8", newline="\r\n")
    asset_lines = ["import type { ImageSourcePropType } from 'react-native';", "", "export const directoryPreviewAssets: Partial<Record<string, ImageSourcePropType>> = {"]
    for entry_id in sorted(previews, key=lambda item: (len(item), item)):
        asset_lines.append(f"    [`{entry_id}`]: require('../../../public{previews[entry_id]}'),")
    asset_source = "\n".join(asset_lines + ["};", ""])
    asset_path = ROOT / "src" / "shared" / "catalog" / "directoryPreviewAssets.native.ts"
    if not asset_path.exists() or asset_path.read_text() != asset_source:
        asset_path.write_text(asset_source, encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description="Collect directory website preview banners from published metadata or screenshots")
    parser.add_argument("--screenshots", action="store_true")
    parser.add_argument("--retry", action="store_true")
    parser.add_argument("--workers", type=int, default=6)
    parser.add_argument("--only", nargs="*")
    options = parser.parse_args()
    OUTPUT.mkdir(parents=True, exist_ok=True)
    REPORT.parent.mkdir(parents=True, exist_ok=True)
    old_records = json.loads(REPORT.read_text(encoding="utf-8")) if REPORT.exists() else []
    records = {record["id"]: record for record in old_records}
    entries = [entry for entry in read_entries() if not options.only or entry["id"] in options.only]
    with ThreadPoolExecutor(max_workers=options.workers) as executor:
        futures = {executor.submit(collect, entry, records.get(entry["id"]), options.screenshots, options.retry): entry for entry in entries}
        for future in as_completed(futures):
            record = future.result()
            records[record["id"]] = record
            print(f"{record['id']}: {record['kind']}", flush=True)
            REPORT.write_text(json.dumps(list(records.values()), indent=2) + "\n", encoding="utf-8")
    update_preview_references(records.values())
    available = sum(bool(record.get("previewImage")) for record in records.values())
    print(f"Preview Banners Collected: {available}/{len(records)}", flush=True)


if __name__ == "__main__":
    main()
