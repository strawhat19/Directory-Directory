export type IconName =
  | `map`
  | `grid`
  | `flag`
  | `list`
  | `plus`
  | `star`
  | `play`
  | `menu`
  | `pause`
  | `info`
  | `mail`
  | `moon`
  | `bell`
  | `sun`
  | `user`
  | `close`
  | `check`
  | `clock`
  | `globe`
  | `tools`
  | `dragon`
  | `folder`
  | `shield`
  | `log-in`
  | `design`
  | `search`
  | `places`
  | `trophy`
  | `bookmark`
  | `sparkles`
  | `file-text`
  | `log-out`
  | `upvote`
  | `downvote`
  | `learning`
  | `business`
  | `lifestyle`
  | `arrow-up`
  | `user-plus`
  | `arrow-right`
  | `technology`
  | `chevron-up`
  | `communities`
  | `clapperboard`
  | `arrow-up-right`;

export type IconProps = {
  id?: string;
  size?: number;
  name: IconName;
  color?: string;
  filled?: boolean;
  strokeWidth?: number;
  className?: string;
  pathStrokeColors?: readonly string[];
};
