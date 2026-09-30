export type SearchScope = `all` | `categories` | `directors`;

export const searchScopes = [
  {
    id: `all`,
    label: `All`,
    icon: `globe`,
    color: `#0874f9`,
    placeholder: `What are you looking for?`,
  },
  {
    id: `categories`,
    icon: `grid`,
    color: `#21a668`,
    label: `Categories`,
    placeholder: `Search categories…`,
  },
  {
    id: `directors`,
    icon: `list`,
    color: `#d83b42`,
    label: `Directors`,
    placeholder: `Search directors…`,
  },
] as const;
