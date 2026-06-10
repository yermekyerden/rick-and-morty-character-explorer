import { useCallback, useEffect } from 'react';
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

  const page = getPageSearchParam(searchParams);
  const hasSearchTerm = searchParams.has(SEARCH_TERM_SEARCH_PARAM);
  const searchTerm = getSearchTermSearchParam(searchParams);
  const selectedCharacterId = getSelectedCharacterIdSearchParam(searchParams);

  useEffect(() => {
    if (isPageSearchParamNormalized(searchParams, page)) {
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams);
    setPageSearchParam(nextSearchParams, page);

    setSearchParams(nextSearchParams, {
      replace: true,
    });
  }, [page, searchParams, setSearchParams]);

  const updateSearchParams = useCallback(
    (options: UpdateCharacterSearchParamsOptions) => {
      setSearchParams(
        (currentSearchParams) =>
          createUpdatedCharacterSearchParams(currentSearchParams, options),
        {
          replace: options.replace ?? false,
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

function createUpdatedCharacterSearchParams(
  currentSearchParams: URLSearchParams,
  { detailsId, page, searchTerm }: UpdateCharacterSearchParamsOptions
): URLSearchParams {
  const nextSearchParams = new URLSearchParams(currentSearchParams);

  if (page !== undefined) {
    setPageSearchParam(nextSearchParams, page);
  }

  if (searchTerm !== undefined) {
    setSearchTermSearchParam(nextSearchParams, searchTerm);
  }

  if (detailsId !== undefined) {
    setDetailsSearchParam(nextSearchParams, detailsId);
  }

  return nextSearchParams;
}

function getPageSearchParam(searchParams: URLSearchParams): number {
  return parsePageNumber(searchParams.get(PAGE_SEARCH_PARAM));
}

function getSearchTermSearchParam(searchParams: URLSearchParams): string {
  return searchParams.get(SEARCH_TERM_SEARCH_PARAM)?.trim() ?? '';
}

function getSelectedCharacterIdSearchParam(
  searchParams: URLSearchParams
): number | null {
  return parseOptionalPositiveInteger(searchParams.get(DETAILS_SEARCH_PARAM));
}

function isPageSearchParamNormalized(
  searchParams: URLSearchParams,
  page: number
): boolean {
  return searchParams.get(PAGE_SEARCH_PARAM) === String(page);
}

function setPageSearchParam(searchParams: URLSearchParams, page: number): void {
  searchParams.set(PAGE_SEARCH_PARAM, String(parsePageNumber(page)));
}

function setSearchTermSearchParam(
  searchParams: URLSearchParams,
  searchTerm: string
): void {
  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm.length > 0) {
    searchParams.set(SEARCH_TERM_SEARCH_PARAM, trimmedSearchTerm);
  } else {
    searchParams.delete(SEARCH_TERM_SEARCH_PARAM);
  }
}

function setDetailsSearchParam(
  searchParams: URLSearchParams,
  detailsId: number | null
): void {
  if (detailsId === null) {
    searchParams.delete(DETAILS_SEARCH_PARAM);
    return;
  }

  const normalizedDetailsId = parseOptionalPositiveInteger(detailsId);

  if (normalizedDetailsId === null) {
    searchParams.delete(DETAILS_SEARCH_PARAM);
    return;
  }

  searchParams.set(DETAILS_SEARCH_PARAM, String(normalizedDetailsId));
}

function parsePageNumber(value: number | string | null): number {
  return parseOptionalPositiveInteger(value) ?? FIRST_PAGE_NUMBER;
}

function parseOptionalPositiveInteger(
  value: number | string | null
): number | null {
  const parsedValue = Number(value);

  if (!Number.isFinite(parsedValue)) {
    return null;
  }

  const integerValue = Math.trunc(parsedValue);

  if (integerValue < FIRST_PAGE_NUMBER) {
    return null;
  }

  return integerValue;
}
