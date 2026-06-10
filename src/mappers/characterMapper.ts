import {
  CHARACTER_STATUS,
  type CharacterCardModel,
  type CharacterDetailsModel,
  type CharacterDto,
  type CharacterStatus,
} from '../types/character';

const FALLBACK_CHARACTER_TYPE = 'None';
const CHARACTER_LOCATION_DESCRIPTION_LABEL = 'Last known location';

type SupportedCharacterStatus =
  | typeof CHARACTER_STATUS.alive
  | typeof CHARACTER_STATUS.dead;

export function mapCharacterDtoToCardModel(
  character: CharacterDto
): CharacterCardModel {
  return {
    id: character.id,
    name: character.name,
    description: createCharacterDescription(character),
    gender: character.gender,
    imageUrl: character.image,
    locationName: character.location.name,
    species: character.species,
    status: normalizeCharacterStatus(character.status),
  };
}

export function mapCharacterDtoToDetailsModel(
  character: CharacterDto
): CharacterDetailsModel {
  return {
    id: character.id,
    name: character.name,
    status: normalizeCharacterStatus(character.status),
    species: character.species,
    type: createCharacterType(character.type),
    gender: character.gender,
    originName: character.origin.name,
    locationName: character.location.name,
    imageUrl: character.image,
    episodeCount: character.episode.length,
    createdAt: character.created,
  };
}

function createCharacterDescription(character: CharacterDto): string {
  const typeSuffix = createCharacterTypeSuffix(character.type);
  const locationName = character.location.name;

  return `${character.species}${typeSuffix}, ${character.gender}. ${CHARACTER_LOCATION_DESCRIPTION_LABEL}: ${locationName}.`;
}

function createCharacterType(characterType: string): string {
  if (characterType.length === 0) {
    return FALLBACK_CHARACTER_TYPE;
  }

  return characterType;
}

function createCharacterTypeSuffix(characterType: string): string {
  if (characterType.length === 0) {
    return '';
  }

  return ` (${characterType})`;
}

function normalizeCharacterStatus(status: string): CharacterStatus {
  if (isSupportedCharacterStatus(status)) {
    return status;
  }

  return CHARACTER_STATUS.unknown;
}

function isSupportedCharacterStatus(
  status: string
): status is SupportedCharacterStatus {
  return status === CHARACTER_STATUS.alive || status === CHARACTER_STATUS.dead;
}
