interface CharacterPageQueryKeyOptions {
  page: number;
  searchTerm: string;
}

export const CHARACTER_QUERY_KEYS = {
  all: ['characters'] as const,

  pages: () => [...CHARACTER_QUERY_KEYS.all, 'pages'] as const,

  page: ({ page, searchTerm }: CharacterPageQueryKeyOptions) =>
    [
      ...CHARACTER_QUERY_KEYS.pages(),
      {
        page,
        searchTerm: searchTerm.trim(),
      },
    ] as const,

  detailsRoot: () => [...CHARACTER_QUERY_KEYS.all, 'details'] as const,

  details: (characterId: number) =>
    [...CHARACTER_QUERY_KEYS.detailsRoot(), characterId] as const,
};
