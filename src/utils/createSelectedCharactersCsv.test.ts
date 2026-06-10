import { describe, expect, it } from 'vitest';
import { testCharacterCard } from '../test/testCharacters';
import type { CharacterCardModel } from '../types/character';
import {
  createCharacterDetailsUrl,
  createSelectedCharactersCsv,
  createSelectedCharactersCsvFileName,
} from './createSelectedCharactersCsv';

const APP_BASE_URL =
  'https://example.com/rick-and-morty-character-explorer/?page=5&search=Rick';

describe('createSelectedCharactersCsv', () => {
  it('creates CSV with header and selected character row', () => {
    const csvContent = createSelectedCharactersCsv(
      [testCharacterCard],
      APP_BASE_URL
    );

    expect(csvContent).toBe(
      [
        '"Name","Status","Species","Gender","Location","Description","Details URL"',
        '"Rick Sanchez","Alive","Human","Male","Citadel of Ricks","Human, Male. Last known location: Citadel of Ricks.","https://example.com/rick-and-morty-character-explorer/?page=1&details=1"',
      ].join('\n')
    );
  });

  it('escapes double quotes inside CSV values', () => {
    const characterWithQuotes: CharacterCardModel = {
      ...testCharacterCard,
      name: 'Rick "Tiny Rick" Sanchez',
    };

    const csvContent = createSelectedCharactersCsv(
      [characterWithQuotes],
      APP_BASE_URL
    );

    expect(csvContent).toContain('"Rick ""Tiny Rick"" Sanchez"');
  });
});

describe('createSelectedCharactersCsvFileName', () => {
  it('creates file name with selected character count', () => {
    expect(createSelectedCharactersCsvFileName(15)).toBe('15_items.csv');
  });
});

describe('createCharacterDetailsUrl', () => {
  it('creates canonical details URL from app base URL', () => {
    expect(createCharacterDetailsUrl(25, APP_BASE_URL)).toBe(
      'https://example.com/rick-and-morty-character-explorer/?page=1&details=25'
    );
  });
});
