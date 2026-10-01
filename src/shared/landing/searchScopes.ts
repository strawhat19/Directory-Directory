export type SearchScope = `all` | `directories` | `directors`;

export type SearchAccent = {
  color: string;
  background: string;
};

export const searchScopes = [
  {
    id: `all`,
    label: `All`,
    icon: `globe`,
    color: `#0874f9`,
    tint: `#edf4ff`,
    darkTint: `#15294c`,
    placeholder: `Search Directories, Directors, etc.`,
  },
  {
    id: `directories`,
    icon: `grid`,
    tint: `#ecf7f1`,
    color: `#21a668`,
    label: `Directories`,
    darkTint: `#15372d`,
    placeholder: `Search directories…`,
  },
  {
    id: `directors`,
    icon: `list`,
    tint: `#fceff0`,
    color: `#d83b42`,
    label: `Directors`,
    darkTint: `#3b2029`,
    placeholder: `Search directors…`,
  },
] as const;

export const getSearchAccent = (scope: SearchScope, isDark: boolean): SearchAccent => {
  const selectedScope = searchScopes.find((item) => item.id === scope) ?? searchScopes[0];

  return {
    color: selectedScope.color,
    background: isDark ? selectedScope.darkTint : selectedScope.tint,
  };
};
