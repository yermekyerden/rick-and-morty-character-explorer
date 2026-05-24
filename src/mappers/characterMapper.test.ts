import { describe, expect, it } from 'vitest';
import { CHARACTER_STATUS } from '../types/character';
import {
  testAliveCharacterDto,
  testCharacterCard,
  testCharacterDetails,
  testUnknownCharacterDto,
} from '../test/testCharacters';
import {
  mapCharacterDtoToCardModel,
  mapCharacterDtoToDetailsModel,
} from './characterMapper';

describe('mapCharacterDtoToCardModel', () => {
  it('maps character DTO to character card model', () => {
    const mappedCharacter = mapCharacterDtoToCardModel(testAliveCharacterDto);

    expect(mappedCharacter).toEqual(testCharacterCard);
  });

  it('includes character type in description when type is provided', () => {
    const expectedDescription =
      'Alien (Parasite), unknown. Last known location: Unknown Dimension.';

    const mappedCharacter = mapCharacterDtoToCardModel(testUnknownCharacterDto);

    expect(mappedCharacter.description).toBe(expectedDescription);
  });

  it('normalizes unsupported status to unknown', () => {
    const expectedStatus = CHARACTER_STATUS.unknown;

    const mappedCharacter = mapCharacterDtoToCardModel(testUnknownCharacterDto);

    expect(mappedCharacter.status).toBe(expectedStatus);
  });
});

describe('mapCharacterDtoToDetailsModel', () => {
  it('maps character DTO to character details model', () => {
    const mappedCharacter = mapCharacterDtoToDetailsModel(
      testAliveCharacterDto
    );

    expect(mappedCharacter).toEqual(testCharacterDetails);
  });
});
