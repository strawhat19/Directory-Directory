export type CategoryId = `design` | `tools` | `communities` | `places`
export type TopicId = `All` | `Featured` | `Popular` | `Latest` | `Trending`

export type DirectoryEntry = {
  id: string
  name: string
  summary: string
  category: CategoryId
  label: string
  featured: boolean
  popularity: number
  freshness: number
  momentum: number
}

export const placeholderPublicDirectoryCount = 1284
export const topics: TopicId[] = [`All`, `Featured`, `Popular`, `Latest`, `Trending`]

export const categories: { id: CategoryId; label: string }[] = [
  { id: `design`, label: `Design` },
  { id: `tools`, label: `Tools` },
  { id: `communities`, label: `Communities` },
  { id: `places`, label: `Places` },
]

export const directories: DirectoryEntry[] = [
  { id: `interface-index`, name: `Interface Index`, summary: `A considered collection of patterns, products, and visual ideas.`, category: `design`, label: `Inspiration`, featured: true, popularity: 92, freshness: 5, momentum: 86 },
  { id: `maker-stack`, name: `Maker Stack`, summary: `Useful tools for building, writing, and making things online.`, category: `tools`, label: `Productivity`, featured: true, popularity: 88, freshness: 8, momentum: 91 },
  { id: `common-ground`, name: `Common Ground`, summary: `Find a group of people who care about what you care about.`, category: `communities`, label: `People`, featured: true, popularity: 76, freshness: 6, momentum: 84 },
  { id: `city-field-notes`, name: `City Field Notes`, summary: `Independent neighborhood guides, local spots, and city lists.`, category: `places`, label: `Local`, featured: true, popularity: 74, freshness: 7, momentum: 82 },
  { id: `type-foundry`, name: `Type Foundry`, summary: `Typefaces, foundries, and tiny details worth noticing.`, category: `design`, label: `Typography`, featured: false, popularity: 83, freshness: 4, momentum: 68 },
  { id: `open-toolbox`, name: `Open Toolbox`, summary: `A tidy index of open tools for everyday digital work.`, category: `tools`, label: `Open source`, featured: false, popularity: 79, freshness: 3, momentum: 78 },
  { id: `project-people`, name: `Project People`, summary: `Communities for collaborative side projects and shared interests.`, category: `communities`, label: `Collaboration`, featured: false, popularity: 70, freshness: 2, momentum: 81 },
  { id: `open-atlas`, name: `Open Atlas`, summary: `Explore thoughtful maps, trails, and places to go next.`, category: `places`, label: `Explore`, featured: false, popularity: 72, freshness: 1, momentum: 75 },
]
