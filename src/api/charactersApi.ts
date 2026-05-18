import {
  CHARACTER_ENDPOINT_PATH,
  FIRST_PAGE_NUMBER,
  RICK_AND_MORTY_API_BASE_URL,
} from '../constants/api';
import { APP_MESSAGES } from '../constants/messages';
import { mapCharacterDtoToCardModel } from '../mappers/characterMapper';
import type {
  CharacterApiResponse,
  CharacterCardModel,
  CharacterPageModel,
  CharacterPageRequest,
} from '../types/character';

export async function fetchCharacterCards(
  searchTerm: string
): Promise<CharacterCardModel[]> {
  const characterPage = await fetchCharacterPage({
    searchTerm,
    page: FIRST_PAGE_NUMBER,
  });

  return characterPage.characters;
}

export async function fetchCharacterPage({
  searchTerm,
  page,
}: CharacterPageRequest): Promise<CharacterPageModel> {
  const currentPage = normalizePageNumber(page);
  const url = createCharacterRequestUrl({ searchTerm, page: currentPage });
  let response: Response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(APP_MESSAGES.apiErrors.networkOrRateLimit);
  }

  if (!response.ok) {
    throw new Error(createCharacterApiErrorMessage(response.status));
  }

  const data = (await response.json()) as CharacterApiResponse;

  return {
    characters: data.results.map(mapCharacterDtoToCardModel),
    currentPage,
    totalPages: data.info.pages,
    totalCount: data.info.count,
  };
}

function createCharacterRequestUrl({
  searchTerm,
  page,
}: CharacterPageRequest): string {
  const url = new URL(
    `${RICK_AND_MORTY_API_BASE_URL}${CHARACTER_ENDPOINT_PATH}`
  );

  url.searchParams.set('page', String(normalizePageNumber(page)));

  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm.length > 0) {
    url.searchParams.set('name', trimmedSearchTerm);
  }

  return url.toString();
}

function normalizePageNumber(page: number): number {
  if (!Number.isFinite(page)) {
    return FIRST_PAGE_NUMBER;
  }

  return Math.max(FIRST_PAGE_NUMBER, Math.trunc(page));
}

function createCharacterApiErrorMessage(statusCode: number): string {
  if (statusCode === 404) {
    return APP_MESSAGES.apiErrors.notFound;
  }

  if (statusCode === 429) {
    return APP_MESSAGES.apiErrors.networkOrRateLimit;
  }

  return APP_MESSAGES.apiErrors.generic;
}
