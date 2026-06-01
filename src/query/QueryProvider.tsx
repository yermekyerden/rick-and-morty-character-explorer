import { QueryClientProvider } from '@tanstack/react-query';
import type { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { appQueryClient } from './queryClient';

interface QueryProviderProps {
  children: ReactNode;
  queryClient?: QueryClient;
}

function QueryProvider({
  children,
  queryClient = appQueryClient,
}: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default QueryProvider;
