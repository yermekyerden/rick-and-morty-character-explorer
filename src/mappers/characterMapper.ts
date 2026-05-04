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
    imageUrl: character.image,
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
