import {
  RICK_AND_MORTY_API_BASE_URL,
  CHARACTER_ENDPOINT_PATH,
  FIRST_PAGE_NUMBER,
} from '../constants/api';
import type {
  CharacterApiResponse,
  CharacterCardModel,
  CharacterDto,
  CharacterStatus,
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

function mapCharacterDtoToCardModel(
  character: CharacterDto
): CharacterCardModel {
  return {
    id: character.id,
    name: character.name,
    description: createCharacterDescription(character),
    imageUrl: character.image,
    status: normalizeCharacterStatus(character.status),
  };
}

function createCharacterDescription(character: CharacterDto): string {
  const typeSuffix = character.type.length > 0 ? ` (${character.type})` : '';
  const locationName = character.location.name;

  return `${character.species}${typeSuffix}, ${character.gender}. Last known location: ${locationName}.`;
}

function createCharacterApiErrorMessage(statusCode: number): string {
  if (statusCode === 404) {
    return 'No characters found for this search. Maybe the portal opened into an empty dimension.';
  }

  return 'Could not load characters from the API. Please try again later.';
}

function normalizeCharacterStatus(status: string): CharacterStatus {
  if (status === 'Alive' || status === 'Dead') {
    return status;
  }

  return 'unknown';
}
