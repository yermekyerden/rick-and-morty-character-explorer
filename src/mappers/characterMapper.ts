import type {
  CharacterCardModel,
  CharacterDetailsModel,
  CharacterDto,
  CharacterStatus,
} from '../types/character';

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
    type: character.type.length > 0 ? character.type : 'None',
    gender: character.gender,
    originName: character.origin.name,
    locationName: character.location.name,
    imageUrl: character.image,
    episodeCount: character.episode.length,
    createdAt: character.created,
  };
}

function createCharacterDescription(character: CharacterDto): string {
  const typeSuffix = character.type.length > 0 ? ` (${character.type})` : '';
  const locationName = character.location.name;

  return `${character.species}${typeSuffix}, ${character.gender}. Last known location: ${locationName}.`;
}

function normalizeCharacterStatus(status: string): CharacterStatus {
  if (status === 'Alive' || status === 'Dead') {
    return status;
  }

  return 'unknown';
}
