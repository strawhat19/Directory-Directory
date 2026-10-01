export type IconName =
  | `grid`
  | `list`
  | `plus`
  | `play`
  | `menu`
  | `pause`
  | `info`
  | `mail`
  | `moon`
  | `bell`
  | `sun`
  | `close`
  | `check`
  | `clock`
  | `globe`
  | `tools`
  | `dragon`
  | `shield`
  | `log-in`
  | `design`
  | `search`
  | `places`
  | `bookmark`
  | `sparkles`
  | `file-text`
  | `log-out`
  | `learning`
  | `business`
  | `lifestyle`
  | `user-plus`
  | `arrow-right`
  | `technology`
  | `communities`
  | `clapperboard`
  | `arrow-up-right`;

export type IconProps = {
  id?: string;
  size?: number;
  name: IconName;
  color?: string;
  filled?: boolean;
  className?: string;
};
