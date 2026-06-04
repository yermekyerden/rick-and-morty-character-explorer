import {
  CHARACTER_ENDPOINT_PATH,
  FIRST_PAGE_NUMBER,
  RICK_AND_MORTY_API_BASE_URL,
} from '../constants/api';
import { APP_MESSAGES } from '../constants/messages';
import {
  mapCharacterDtoToCardModel,
  mapCharacterDtoToDetailsModel,
} from '../mappers/characterMapper';
import type {
  CharacterApiResponse,
  CharacterDetailsModel,
  CharacterDto,
  CharacterPageModel,
  CharacterPageRequest,
} from '../types/character';

const HTTP_STATUS = {
  notFound: 404,
  tooManyRequests: 429,
} as const;

interface CharacterPageRequestUrlOptions {
  currentPage: number;
  searchTerm: string;
}

export async function fetchCharacterPage({
  searchTerm,
  page,
}: CharacterPageRequest): Promise<CharacterPageModel> {
  const currentPage = normalizePageNumber(page);
  const url = createCharacterPageRequestUrl({
    currentPage,
    searchTerm,
  });
  const response = await fetchCharacterApiResponse(url);

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

export async function fetchCharacterDetails(
  characterId: number
): Promise<CharacterDetailsModel> {
  const url = createCharacterDetailsRequestUrl(characterId);
  const response = await fetchCharacterApiResponse(url);

  if (!response.ok) {
    throw new Error(createCharacterApiErrorMessage(response.status));
  }

  const data = (await response.json()) as CharacterDto;

  return mapCharacterDtoToDetailsModel(data);
}

async function fetchCharacterApiResponse(url: string): Promise<Response> {
  try {
    return await fetch(url);
  } catch {
    throw new Error(APP_MESSAGES.apiErrors.networkOrRateLimit);
  }
}

function createCharacterPageRequestUrl({
  currentPage,
  searchTerm,
}: CharacterPageRequestUrlOptions): string {
  const url = new URL(
    `${RICK_AND_MORTY_API_BASE_URL}${CHARACTER_ENDPOINT_PATH}`
  );

  url.searchParams.set('page', String(currentPage));

  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm.length > 0) {
    url.searchParams.set('name', trimmedSearchTerm);
  }

  return url.toString();
}

function createCharacterDetailsRequestUrl(characterId: number): string {
  const normalizedCharacterId = normalizeCharacterId(characterId);

  return `${RICK_AND_MORTY_API_BASE_URL}${CHARACTER_ENDPOINT_PATH}/${normalizedCharacterId}`;
}

function normalizePageNumber(page: number): number {
  if (!Number.isFinite(page)) {
    return FIRST_PAGE_NUMBER;
  }

  return Math.max(FIRST_PAGE_NUMBER, Math.trunc(page));
}

function normalizeCharacterId(characterId: number): number {
  if (!Number.isFinite(characterId)) {
    return FIRST_PAGE_NUMBER;
  }

  return Math.max(FIRST_PAGE_NUMBER, Math.trunc(characterId));
}

function createCharacterApiErrorMessage(statusCode: number): string {
  if (statusCode === HTTP_STATUS.notFound) {
    return APP_MESSAGES.apiErrors.notFound;
  }

  if (statusCode === HTTP_STATUS.tooManyRequests) {
    return APP_MESSAGES.apiErrors.networkOrRateLimit;
  }

  return APP_MESSAGES.apiErrors.generic;
}
