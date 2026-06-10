import { useQuery } from '@tanstack/react-query';
import { fetchCharacterPage } from '../api/charactersApi';
import { MIN_LOADING_TIME_IN_MS } from '../constants/timing';
import type { CharacterPageModel } from '../types/character';
import { delay } from '../utils/delay';
import { CHARACTER_QUERY_KEYS } from './queryKeys';

interface UseCharacterPageQueryOptions {
  isEnabled: boolean;
  page: number;
  searchTerm: string;
}

export function useCharacterPageQuery({
  isEnabled,
  page,
  searchTerm,
}: UseCharacterPageQueryOptions) {
  const normalizedSearchTerm = searchTerm.trim();

  return useQuery<CharacterPageModel>({
    queryKey: CHARACTER_QUERY_KEYS.page({
      page,
      searchTerm: normalizedSearchTerm,
    }),
    queryFn: async () => {
      const [characterPage] = await Promise.all([
        fetchCharacterPage({
          page,
          searchTerm: normalizedSearchTerm,
        }),
        delay(MIN_LOADING_TIME_IN_MS),
      ]);

      return characterPage;
    },
    enabled: isEnabled,
  });
}
