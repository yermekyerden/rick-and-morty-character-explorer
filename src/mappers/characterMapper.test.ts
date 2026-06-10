import { describe, expect, it } from 'vitest';
import {
  testAliveCharacterDto,
  testCharacterCard,
  testUnknownCharacterDto,
} from '../test/testCharacters';
import { mapCharacterDtoToCardModel } from './characterMapper';

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
    const expectedStatus = 'unknown';

    const mappedCharacter = mapCharacterDtoToCardModel(testUnknownCharacterDto);

    expect(mappedCharacter.status).toBe(expectedStatus);
  });
});
