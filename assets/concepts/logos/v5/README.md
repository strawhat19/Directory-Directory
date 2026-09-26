# Directory Directory — V5 brand mark

The [V4 concept board](../v4/03-nested-index-hybrid.png) sets the visual direction. The editable [`app/icon.svg`](../../../../app/icon.svg) supplies the exact vector paths. V5 keeps four nested D shapes with a proportionally smaller top-left index tab on every level, including the innermost counter.

| Variant | Color | Vector | 1024px PNG |
| --- | --- | --- | --- |
| Blue | `#0874F9` | [mark-blue.svg](mark-blue.svg) | [mark-blue.png](mark-blue.png) |
| Red | `#D83B42` | [mark-red.svg](mark-red.svg) | [mark-red.png](mark-red.png) |
| Green | `#21A668` | [mark-green.svg](mark-green.svg) | [mark-green.png](mark-green.png) |
| Black | `#0B1018` | [mark-black.svg](mark-black.svg) | [mark-black.png](mark-black.png) |

The four standalone marks have transparent backgrounds and share one compound path. [launcher-blue-on-black.svg](launcher-blue-on-black.svg) and [launcher-blue-on-black.png](launcher-blue-on-black.png) place the blue mark on an opaque `#0B1018` square with about 16% clear padding on each side. The PNG is configured as the Expo app icon and web favicon.

The PNGs were rendered from their SVGs with macOS Quick Look (`qlmanage`) and sized to exactly 1024 × 1024 with `sips`. Regenerate from the vectors when changing colors or geometry; do not crop symbols from the V4 composite board.
