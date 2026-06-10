import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { CHARACTER_QUERY_KEYS } from './queryKeys';

interface UseRefreshCharacterQueriesOptions {
  page: number;
  searchTerm: string;
  selectedCharacterId: number | null;
}

export function useRefreshCharacterQueries({
  page,
  searchTerm,
  selectedCharacterId,
}: UseRefreshCharacterQueriesOptions): () => Promise<void> {
  const queryClient = useQueryClient();

  return useCallback(async () => {
    const invalidationPromises = [
      queryClient.invalidateQueries({
        queryKey: CHARACTER_QUERY_KEYS.page({
          page,
          searchTerm,
        }),
      }),
    ];

    if (selectedCharacterId !== null) {
      invalidationPromises.push(
        queryClient.invalidateQueries({
          queryKey: CHARACTER_QUERY_KEYS.details(selectedCharacterId),
        })
      );
    }

    await Promise.all(invalidationPromises);
  }, [page, queryClient, searchTerm, selectedCharacterId]);
}
