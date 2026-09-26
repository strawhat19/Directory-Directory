import Svg, { Circle, Path, Rect, type SvgProps } from 'react-native-svg'

export type NativeIconProps = {
  id?: string
  color?: string
  backgroundColor?: string
  size?: number
  style?: SvgProps['style']
  testID?: string
}

export type CategoryIconName = `design` | `tools` | `communities` | `places`
export type UiIconName = `search` | `chevron` | `grid` | `table` | `list` | `sun` | `moon` | `close` | `menu`

type CategoryIconProps = NativeIconProps & { name: CategoryIconName }
type UiIconProps = NativeIconProps & { name: UiIconName }

const brandMarkPath = [
  `M25 20h24c4 0 7 2 9 6l4 8h15c28 0 47 20 47 45s-19 45-47 45H25c-4 0-7-3-7-7V27c0-4 3-7 7-7Z`,
  `M44 43h17c3 0 5 1 6 4l3 5h10c17 0 28 12 28 27s-11 27-28 27H44c-3 0-5-2-5-5V48c0-3 2-5 5-5Z`,
  `M59 59h9c2 0 3 1 4 3l2 3h6c9 0 15 6 15 14s-6 14-15 14H59c-2 0-3-1-3-3V62c0-2 1-3 3-3Z`,
  `M69 70h4c1 0 2 1 2 2l2 3h1c5 0 8 3 8 7s-3 7-8 7h-9V70Z`,
].join(` `)

export const BrandMark = ({
  id = `brand-mark`,
  color = `#172121`,
  size = 32,
  style,
  testID,
}: NativeIconProps) => (
  <Svg
    id={id}
    width={size}
    height={size}
    viewBox={`0 0 128 128`}
    fill={color}
    style={style}
    testID={testID ?? id}
  >
    <Path id={`${id}-shape`} fillRule={`evenodd`} d={brandMarkPath} />
  </Svg>
)

export const NestedDArt = ({
  id = `nested-d-art`,
  color = `#172121`,
  size = 300,
  style,
  testID,
}: NativeIconProps) => (
  <Svg
    id={id}
    width={size}
    height={size * 405 / 400}
    viewBox={`0 0 400 405`}
    fill={`none`}
    stroke={color}
    strokeWidth={2.25}
    strokeLinejoin={`round`}
    style={style}
    testID={testID ?? id}
  >
    <Path
      id={`${id}-outline-one`}
      d={`M18 2h75c7 0 10 3 13 9l10 22c2 4 4 5 9 5h99c102 0 163 67 163 163S326 403 224 403H18c-9 0-15-6-15-15V17C3 8 9 2 18 2Z`}
    />
    <Path
      id={`${id}-outline-two`}
      d={`M61 55h17c5 0 8 2 10 6l5 9c1 3 3 4 7 4h100c87 0 142 52 142 128S287 350 200 350H61c-7 0-11-4-11-11V66c0-7 4-11 11-11Z`}
    />
    <Path
      id={`${id}-outline-three`}
      d={`M101 98h17c4 0 6 2 8 5l4 8c1 3 3 4 6 4h64c62 0 104 37 104 87s-42 106-104 106h-99c-6 0-9-3-9-9V107c0-6 3-9 9-9Z`}
    />
    <Path
      id={`${id}-outline-four`}
      d={`M136 140h17c3 0 5 1 6 4l3 6c1 2 3 3 5 3h33c38 0 68 20 68 50s-30 66-68 66h-64c-5 0-7-2-7-7V147c0-5 2-7 7-7Z`}
    />
    <Path
      id={`${id}-outline-five`}
      d={`M170 180h13c2 0 3 1 4 3l2 4c1 2 2 2 4 2h9c18 0 31 12 31 27s-13 28-31 28h-32c-3 0-5-2-5-5v-54c0-3 2-5 5-5Z`}
    />
  </Svg>
)

const categoryArtwork = (name: CategoryIconName, id: string) => {
  switch (name) {
    case `design`:
      return (
        <>
          <Path
            id={`${id}-pencil`}
            d={`m5 28 3-9L25 2l7 7-17 17-10 2Z`}
          />
          <Path
            id={`${id}-pencil-tip`}
            d={`m8 19 7 7M21 6l7 7M24 30h9`}
          />
        </>
      )
    case `tools`:
      return (
        <Path
          id={`${id}-wrench`}
          d={`M30 7a10 10 0 0 1-12 12L7 30a4 4 0 0 1-6-6l11-11A10 10 0 0 1 25 1l-6 6 2 5 5 1 4-6Z`}
        />
      )
    case `communities`:
      return (
        <>
          <Circle id={`${id}-person-center`} cx={18} cy={9} r={4} />
          <Circle id={`${id}-person-left`} cx={7} cy={13} r={3} />
          <Circle id={`${id}-person-right`} cx={29} cy={13} r={3} />
          <Path
            id={`${id}-group-center`}
            d={`M10 29v-3a8 8 0 0 1 16 0v3H10Z`}
          />
          <Path
            id={`${id}-group-sides`}
            d={`M5 26H1v-2a6 6 0 0 1 7-6m23 8h4v-2a6 6 0 0 0-7-6`}
          />
        </>
      )
    case `places`:
      return (
        <>
          <Path
            id={`${id}-pin`}
            d={`M18 34S5 22 5 14a13 13 0 1 1 26 0c0 8-13 20-13 20Z`}
          />
          <Circle id={`${id}-pin-center`} cx={18} cy={14} r={4} />
        </>
      )
  }
}

export const CategoryIcon = ({
  name,
  id = `category-icon-${name}`,
  color = `#172121`,
  size = 30,
  style,
  testID,
}: CategoryIconProps) => (
  <Svg
    id={id}
    width={size}
    height={size}
    viewBox={`0 0 36 36`}
    fill={`none`}
    stroke={color}
    strokeWidth={2.4}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    style={style}
    testID={testID ?? id}
  >
    {categoryArtwork(name, id)}
  </Svg>
)

const uiArtwork = (name: UiIconName, id: string) => {
  switch (name) {
    case `search`:
      return (
        <>
          <Circle id={`${id}-search-lens`} cx={11} cy={11} r={7} />
          <Path id={`${id}-search-handle`} d={`m16 16 6 6`} />
        </>
      )
    case `chevron`:
      return <Path id={`${id}-chevron-line`} d={`m9 5 7 7-7 7`} />
    case `grid`:
      return (
        <>
          <Rect id={`${id}-grid-top-left`} x={3} y={3} width={7} height={7} rx={1} />
          <Rect id={`${id}-grid-top-right`} x={14} y={3} width={7} height={7} rx={1} />
          <Rect id={`${id}-grid-bottom-left`} x={3} y={14} width={7} height={7} rx={1} />
          <Rect id={`${id}-grid-bottom-right`} x={14} y={14} width={7} height={7} rx={1} />
        </>
      )
    case `table`:
      return (
        <>
          <Rect id={`${id}-table-frame`} x={3} y={4} width={18} height={16} rx={1} />
          <Path id={`${id}-table-dividers`} d={`M3 9h18M10 9v11`} />
        </>
      )
    case `list`:
      return (
        <>
          <Path id={`${id}-list-lines`} d={`M9 5h12M9 12h12M9 19h12`} />
          <Path id={`${id}-list-bullets`} d={`M3 5h.01M3 12h.01M3 19h.01`} strokeWidth={4} />
        </>
      )
    case `sun`:
      return (
        <>
          <Circle id={`${id}-sun-center`} cx={12} cy={12} r={4} />
          <Path
            id={`${id}-sun-rays`}
            d={`M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42m0-14.14-1.42 1.42M6.35 17.65l-1.42 1.42`}
          />
        </>
      )
    case `moon`:
      return <Path id={`${id}-moon-shape`} d={`M20.5 15.6A9 9 0 0 1 8.4 3.5 9 9 0 1 0 20.5 15.6Z`} />
    case `close`:
      return <Path id={`${id}-close-lines`} d={`M5 5 19 19M19 5 5 19`} />
    case `menu`:
      return <Path id={`${id}-menu-lines`} d={`M3 6h18M3 12h18M3 18h18`} />
  }
}

export const UiIcon = ({
  name,
  id = `ui-icon-${name}`,
  color = `#172121`,
  size = 20,
  style,
  testID,
}: UiIconProps) => (
  <Svg
    id={id}
    width={size}
    height={size}
    viewBox={`0 0 24 24`}
    fill={`none`}
    stroke={color}
    strokeWidth={2}
    strokeLinecap={`round`}
    strokeLinejoin={`round`}
    style={style}
    testID={testID ?? id}
  >
    {uiArtwork(name, id)}
  </Svg>
)
