import type {
  CharacterCardModel,
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
