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
} from '../types/character';

export async function fetchCharacterCards(
  searchTerm: string
): Promise<CharacterCardModel[]> {
  const url = createCharacterRequestUrl(searchTerm);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(createCharacterApiErrorMessage(response.status));
  }

  const data = (await response.json()) as CharacterApiResponse;

  return data.results.map(mapCharacterDtoToCardModel);
}

function createCharacterRequestUrl(searchTerm: string): string {
  const url = new URL(
    `${RICK_AND_MORTY_API_BASE_URL}${CHARACTER_ENDPOINT_PATH}`
  );

  url.searchParams.set('page', String(FIRST_PAGE_NUMBER));

  const trimmedSearchTerm = searchTerm.trim();

  if (trimmedSearchTerm.length > 0) {
    url.searchParams.set('name', trimmedSearchTerm);
  }

  return url.toString();
}

function createCharacterApiErrorMessage(statusCode: number): string {
  if (statusCode === 404) {
    return APP_MESSAGES.apiErrors.notFound;
  }

  return APP_MESSAGES.apiErrors.generic;
}
