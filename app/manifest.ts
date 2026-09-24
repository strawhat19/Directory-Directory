import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `Directory Directory`,
    short_name: `Directory`,
    description: `The Directory of Directories`,
    start_url: `/`,
    display: `standalone`,
    background_color: `#fefefd`,
    theme_color: `#0b1b36`,
    icons: [{ src: `/icon.svg`, sizes: `any`, type: `image/svg+xml` }],
  }
}
