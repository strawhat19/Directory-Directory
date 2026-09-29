# Directory Directory — V12 folder tabs

V12 uses the exact enclosing D path from [V9](../v9/01-indexed-d.svg), including its 9-unit rounded outline. Its three original rounded pill bodies now each have an integrated folder tab rising from the upper-left edge. Each tab has a flat top, rounded corners, and a short sloping shoulder that echoes the enclosing D.

| Asset | Treatment |
| --- | --- |
| [01-indexed-d-folder-tabs-outline.svg](01-indexed-d-folder-tabs-outline.svg) | Original D outline with outlined folder pills. |
| [02-indexed-d-folder-tabs-filled.svg](02-indexed-d-folder-tabs-filled.svg) | Filled D silhouette and filled folder pills, with transparent separation around each pill. |
| [03-light-dark-comparison.svg](03-light-dark-comparison.svg) | Both treatments presented on pure white and pure black. |

## Color

- Blue: `#6684B6`, a softer muted steel/periwinkle blue replacing `#0874F9` in both the D and middle row.
- Green: `#21A668`.
- Red: `#D83B42`.

## Geometry and editing

The editable marks retain the `160 × 160` viewBox. The enclosing D path is copied directly from V9. Both treatments retain its 9-unit rounded stroke; the filled treatment adds the same blue inside it.

The pill bodies preserve V9's 10-unit height and 5-unit end radius. Their centerlines remain at y=64, 87, and 110. Their left center is x=44, and right centers remain x=94, 103, and 84. Consequently, their body bounds remain x=39–99, 39–108, and 39–89.

Each folder tab begins at x=44, rises 7 units above its pill's top, has a 3-unit rounded upper-left corner, a short horizontal top from x=47 to x=54, and a rounded sloping shoulder meeting the pill at x=61.5. The pill's original rounded left end remains below the tab. Tabs protrude upward and have no circular left lobes.

The outline pills use a 2.25-unit stroke. Filled pills are separated from the D with a transparent 1.75-unit clearance, made by a luminance mask. That clearance reveals the actual background. It is not a white border, so the same mark can be placed on white or black.

Named paths, classes, titles, and descriptions keep every shape editable. Earlier versions and the app icon are preserved. No tests, builds, or verification commands were run, per repository instructions.
