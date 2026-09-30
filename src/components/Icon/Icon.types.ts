export type IconName =
  | `grid`
  | `list`
  | `plus`
  | `menu`
  | `close`
  | `check`
  | `globe`
  | `tools`
  | `design`
  | `search`
  | `places`
  | `bookmark`
  | `sparkles`
  | `arrow-right`
  | `communities`
  | `arrow-up-right`;

export type IconProps = {
  id?: string;
  size?: number;
  name: IconName;
  color?: string;
  className?: string;
};
