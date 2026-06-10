import { QueryClient } from '@tanstack/react-query';
import { QUERY_CACHE_TTL_IN_MS } from './queryConfig';

export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_CACHE_TTL_IN_MS,
        gcTime: QUERY_CACHE_TTL_IN_MS,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });
}

export const appQueryClient = createAppQueryClient();
