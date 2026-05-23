import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { FIRST_PAGE_NUMBER } from '../constants/api';
import {
  DETAILS_SEARCH_PARAM,
  PAGE_SEARCH_PARAM,
  SEARCH_TERM_SEARCH_PARAM,
} from '../constants/searchParams';

interface UpdateCharacterSearchParamsOptions {
  detailsId?: number | null;
  page?: number;
  replace?: boolean;
  searchTerm?: string;
}

interface UseCharacterSearchParamsResult {
  hasSearchTerm: boolean;
  page: number;
  searchTerm: string;
  selectedCharacterId: number | null;
  updateSearchParams: (options: UpdateCharacterSearchParamsOptions) => void;
}

export function useCharacterSearchParams(): UseCharacterSearchParamsResult {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = useMemo(
    () => parsePageNumber(searchParams.get(PAGE_SEARCH_PARAM)),
    [searchParams]
  );

  const hasSearchTerm = useMemo(
    () => searchParams.has(SEARCH_TERM_SEARCH_PARAM),
    [searchParams]
  );

  const searchTerm = useMemo(
    () => searchParams.get(SEARCH_TERM_SEARCH_PARAM)?.trim() ?? '',
    [searchParams]
  );

  const selectedCharacterId = useMemo(
    () => parseOptionalPositiveInteger(searchParams.get(DETAILS_SEARCH_PARAM)),
    [searchParams]
  );

  useEffect(() => {
    const currentPageParam = searchParams.get(PAGE_SEARCH_PARAM);
    const normalizedPageParam = String(page);

    if (currentPageParam === normalizedPageParam) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set(PAGE_SEARCH_PARAM, normalizedPageParam);

    setSearchParams(nextSearchParams, {
      replace: true,
    });
  }, [page, searchParams, setSearchParams]);

  const updateSearchParams = useCallback(
    ({
      detailsId,
      page: nextPage,
      replace = false,
      searchTerm: nextSearchTerm,
    }: UpdateCharacterSearchParamsOptions) => {
      setSearchParams(
        (currentSearchParams) => {
          const nextSearchParams = new URLSearchParams(currentSearchParams);

          if (nextPage !== undefined) {
            nextSearchParams.set(
              PAGE_SEARCH_PARAM,
              String(parsePageNumber(String(nextPage)))
            );
          }

          if (nextSearchTerm !== undefined) {
            const trimmedSearchTerm = nextSearchTerm.trim();

            if (trimmedSearchTerm.length > 0) {
              nextSearchParams.set(SEARCH_TERM_SEARCH_PARAM, trimmedSearchTerm);
            } else {
              nextSearchParams.delete(SEARCH_TERM_SEARCH_PARAM);
            }
          }

          if (detailsId !== undefined) {
            if (detailsId === null) {
              nextSearchParams.delete(DETAILS_SEARCH_PARAM);
            } else {
              nextSearchParams.set(DETAILS_SEARCH_PARAM, String(detailsId));
            }
          }

          return nextSearchParams;
        },
        {
          replace,
        }
      );
    },
    [setSearchParams]
  );

  return {
    hasSearchTerm,
    page,
    searchTerm,
    selectedCharacterId,
    updateSearchParams,
  };
}

function parsePageNumber(value: string | null): number {
  const parsedPage = Number(value);

  if (!Number.isFinite(parsedPage)) {
    return FIRST_PAGE_NUMBER;
  }

  return Math.max(FIRST_PAGE_NUMBER, Math.trunc(parsedPage));
}

function parseOptionalPositiveInteger(value: string | null): number | null {
  if (value === null) {
    return null;
  }

  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  const normalizedValue = Math.trunc(parsedValue);

  return normalizedValue > 0 ? normalizedValue : null;
}
