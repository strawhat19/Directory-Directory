# Directory Catalog Research

Updated October 9, 2026: 150 directory entries across the existing 12 categories, including 84 researched additions selected for established reputation and category fit. The latest 50 additions all include reviewed preview images.

- `directory-additions-a.json` through `directory-additions-e.json` contain the added records
- `directory-sources-a.json` through `directory-sources-e.json` record official sources and selection evidence for each addition
- `directory-preview-sources.json` records each preview's original website, published image URL or screenshot URL, and collection date
- `directory-preview-sources-c.json` through `directory-preview-sources-e.json` retain the reviewed preview records for the latest 50 additions

115 usable preview banners are cached under `public/directory-previews/`. The other 35 sites returned access checks, errors, or incomplete captures; their cards display the initials fallback. Published Open Graph or Twitter images are preferred, followed by published page images and website screenshots from [Thum.io](https://www.thum.io/documentation/api/url). No screenshot service is called while browsing cards.

To collect previews again, run `ai/tools/collect-directory-previews.py` with a Python runtime that includes Pillow. `--screenshots` enables screenshot capture, `--only` accepts directory IDs, and `--workers` limits concurrent requests. Previously rejected captures are skipped unless `--retry` is supplied. The script updates the catalog preview paths and native asset map after collection; review newly captured assets before using them.
