import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;
type CategoryName = `design` | `tools` | `communities` | `places`;
type UiIconName = `search` | `chevron` | `grid` | `table` | `list` | `sun` | `moon` | `close` | `menu`;

type CategoryIconProps = IconProps & { name: CategoryName };
type UiIconProps = IconProps & { name: UiIconName };

export const BrandMark = ({ className = ``, ...props }: IconProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="currentColor"
    aria-hidden="true"
    className={`brand-mark ${className}`.trim()}
    {...props}
  >
    <path
      className="brand-mark-outer-d"
      fillRule="evenodd"
      d="M7 4h15c3 0 5 1 6 4l4 7h17c29 0 47 18 47 42S78 98 49 98H7c-3 0-5-2-5-5V9c0-3 2-5 5-5Zm16 18c-3 0-5 2-5 5v52c0 3 2 5 5 5h26c19 0 32-11 32-27S68 29 49 29H34c-2 0-3-1-4-3l-2-4h-5Z"
    />
    <path
      className="brand-mark-middle-d"
      fillRule="evenodd"
      d="M32 32h10c2 0 3 1 4 3l2 4h5c14 0 23 8 23 19S67 77 53 77H32c-2 0-3-1-3-3V35c0-2 1-3 3-3Zm12 13c-2 0-3 1-3 3v16c0 2 1 3 3 3h8c7 0 12-4 12-10s-5-10-12-10h-3l-1-2h-4Z"
    />
    <path
      className="brand-mark-inner-d"
      fillRule="evenodd"
      d="M44 46h3c1 0 2 0 2 1l1 2h2c6 0 10 4 10 9s-4 9-10 9h-8c-1 0-2-1-2-2V48c0-1 1-2 2-2Zm6 7v10h2c3 0 5-2 5-5s-2-5-5-5h-2Z"
    />
  </svg>
);

export const NestedDArt = ({ className = ``, ...props }: IconProps) => (
  <svg
    viewBox="0 0 400 405"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.25"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`nested-d-art ${className}`.trim()}
    {...props}
  >
    <path
      className="nested-d-art-outline nested-d-art-outline--one"
      d="M18 2h75c7 0 10 3 13 9l10 22c2 4 4 5 9 5h99c102 0 163 67 163 163S326 403 224 403H18c-9 0-15-6-15-15V17C3 8 9 2 18 2Z"
    />
    <path
      className="nested-d-art-outline nested-d-art-outline--two"
      d="M61 55h17c5 0 8 2 10 6l5 9c1 3 3 4 7 4h100c87 0 142 52 142 128S287 350 200 350H61c-7 0-11-4-11-11V66c0-7 4-11 11-11Z"
    />
    <path
      className="nested-d-art-outline nested-d-art-outline--three"
      d="M101 98h17c4 0 6 2 8 5l4 8c1 3 3 4 6 4h64c62 0 104 37 104 87s-42 106-104 106h-99c-6 0-9-3-9-9V107c0-6 3-9 9-9Z"
    />
    <path
      className="nested-d-art-outline nested-d-art-outline--four"
      d="M136 140h17c3 0 5 1 6 4l3 6c1 2 3 3 5 3h33c38 0 68 20 68 50s-30 66-68 66h-64c-5 0-7-2-7-7V147c0-5 2-7 7-7Z"
    />
    <path
      className="nested-d-art-outline nested-d-art-outline--five"
      d="M170 180h13c2 0 3 1 4 3l2 4c1 2 2 2 4 2h9c18 0 31 12 31 27s-13 28-31 28h-32c-3 0-5-2-5-5v-54c0-3 2-5 5-5Z"
    />
  </svg>
);

const categoryArtwork = {
  design: (
    <>
      <path className="category-icon-pencil" d="m5 28 3-9L25 2l7 7-17 17-10 2Z" />
      <path className="category-icon-pencil-tip" d="m8 19 7 7M21 6l7 7M24 30h9" />
    </>
  ),
  tools: (
    <>
      <path className="category-icon-wrench" d="M30 7a10 10 0 0 1-12 12L7 30a4 4 0 0 1-6-6l11-11A10 10 0 0 1 25 1l-6 6 2 5 5 1 4-6Z" />
    </>
  ),
  communities: (
    <>
      <circle className="category-icon-person-center" cx="18" cy="9" r="4" />
      <circle className="category-icon-person-left" cx="7" cy="13" r="3" />
      <circle className="category-icon-person-right" cx="29" cy="13" r="3" />
      <path className="category-icon-group-center" d="M10 29v-3a8 8 0 0 1 16 0v3H10Z" />
      <path className="category-icon-group-sides" d="M5 26H1v-2a6 6 0 0 1 7-6m23 8h4v-2a6 6 0 0 0-7-6" />
    </>
  ),
  places: (
    <>
      <path className="category-icon-pin" d="M18 34S5 22 5 14a13 13 0 1 1 26 0c0 8-13 20-13 20Z" />
      <circle className="category-icon-pin-center" cx="18" cy="14" r="4" />
    </>
  ),
};

export const CategoryIcon = ({ name, className = ``, ...props }: CategoryIconProps) => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`category-icon category-icon--${name} ${className}`.trim()}
    {...props}
  >
    {categoryArtwork[name]}
  </svg>
);

const uiArtwork = {
  search: (
    <>
      <circle className="ui-icon-search-lens" cx="11" cy="11" r="7" />
      <path className="ui-icon-search-handle" d="m16 16 6 6" />
    </>
  ),
  chevron: <path className="ui-icon-chevron-line" d="m9 5 7 7-7 7" />,
  grid: (
    <>
      <rect className="ui-icon-grid-cell" x="3" y="3" width="7" height="7" rx="1" />
      <rect className="ui-icon-grid-cell" x="14" y="3" width="7" height="7" rx="1" />
      <rect className="ui-icon-grid-cell" x="3" y="14" width="7" height="7" rx="1" />
      <rect className="ui-icon-grid-cell" x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  table: (
    <>
      <rect className="ui-icon-table-frame" x="3" y="4" width="18" height="16" rx="1" />
      <path className="ui-icon-table-dividers" d="M3 9h18M10 9v11" />
    </>
  ),
  list: (
    <>
      <path className="ui-icon-list-lines" d="M9 5h12M9 12h12M9 19h12" />
      <path className="ui-icon-list-bullets" d="M3 5h.01M3 12h.01M3 19h.01" strokeWidth="4" />
    </>
  ),
  sun: (
    <>
      <circle className="ui-icon-sun-center" cx="12" cy="12" r="4" />
      <path className="ui-icon-sun-rays" d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42" />
    </>
  ),
  moon: <path className="ui-icon-moon-shape" d="M20.5 15.6A9 9 0 0 1 8.4 3.5 9 9 0 1 0 20.5 15.6Z" />,
  close: <path className="ui-icon-close-lines" d="M5 5 19 19M19 5 5 19" />,
  menu: <path className="ui-icon-menu-lines" d="M3 6h18M3 12h18M3 18h18" />,
};

export const UiIcon = ({ name, className = ``, ...props }: UiIconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={`ui-icon ui-icon--${name} ${className}`.trim()}
    {...props}
  >
    {uiArtwork[name]}
  </svg>
);
