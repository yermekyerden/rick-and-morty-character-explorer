import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { useCharacterSearchParams } from './useCharacterSearchParams';

function createRouterWrapper(initialRoute: string) {
  return function RouterWrapper({ children }: { children: ReactNode }) {
    return (
      <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
    );
  };
}

describe('useCharacterSearchParams', () => {
  it('returns first page when URL has no page parameter', () => {
    const { result } = renderHook(() => useCharacterSearchParams(), {
      wrapper: createRouterWrapper('/'),
    });

    expect(result.current.page).toBe(1);
    expect(result.current.searchTerm).toBe('');
    expect(result.current.hasSearchTerm).toBe(false);
    expect(result.current.selectedCharacterId).toBeNull();
  });

  it('reads page, search term and selected character from URL', () => {
    const { result } = renderHook(() => useCharacterSearchParams(), {
      wrapper: createRouterWrapper('/?page=3&search=Rick&details=25'),
    });

    expect(result.current.page).toBe(3);
    expect(result.current.searchTerm).toBe('Rick');
    expect(result.current.hasSearchTerm).toBe(true);
    expect(result.current.selectedCharacterId).toBe(25);
  });

  it('normalizes invalid page and details parameters', () => {
    const { result } = renderHook(() => useCharacterSearchParams(), {
      wrapper: createRouterWrapper('/?page=-10&details=-5'),
    });

    expect(result.current.page).toBe(1);
    expect(result.current.selectedCharacterId).toBeNull();
  });

  it('updates search parameters', async () => {
    const { result } = renderHook(() => useCharacterSearchParams(), {
      wrapper: createRouterWrapper('/'),
    });

    act(() => {
      result.current.updateSearchParams({
        detailsId: 25,
        page: 2,
        searchTerm: '  Morty  ',
      });
    });

    await waitFor(() => {
      expect(result.current.page).toBe(2);
      expect(result.current.searchTerm).toBe('Morty');
      expect(result.current.selectedCharacterId).toBe(25);
    });
  });

  it('removes empty search term and selected character', async () => {
    const { result } = renderHook(() => useCharacterSearchParams(), {
      wrapper: createRouterWrapper('/?page=2&search=Rick&details=1'),
    });

    act(() => {
      result.current.updateSearchParams({
        detailsId: null,
        searchTerm: '',
      });
    });

    await waitFor(() => {
      expect(result.current.page).toBe(2);
      expect(result.current.searchTerm).toBe('');
      expect(result.current.selectedCharacterId).toBeNull();
    });
  });
});
