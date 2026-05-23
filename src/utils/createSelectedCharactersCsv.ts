import { FIRST_PAGE_NUMBER } from '../constants/api';
import {
  DETAILS_SEARCH_PARAM,
  PAGE_SEARCH_PARAM,
} from '../constants/searchParams';
import type { CharacterCardModel } from '../types/character';

const CSV_HEADERS = [
  'Name',
  'Status',
  'Species',
  'Gender',
  'Location',
  'Description',
  'Details URL',
];

export function createSelectedCharactersCsv(
  characters: CharacterCardModel[],
  appBaseUrl: string
): string {
  const rows = characters.map((character) =>
    createCharacterCsvRow(character, appBaseUrl)
  );

  return [CSV_HEADERS, ...rows].map(createCsvLine).join('\n');
}

export function createSelectedCharactersCsvFileName(
  characterCount: number
): string {
  return `${characterCount}_items.csv`;
}

export function createCharacterDetailsUrl(
  characterId: number,
  appBaseUrl: string
): string {
  const detailsUrl = new URL(appBaseUrl);

  detailsUrl.search = '';
  detailsUrl.hash = '';
  detailsUrl.searchParams.set(PAGE_SEARCH_PARAM, String(FIRST_PAGE_NUMBER));
  detailsUrl.searchParams.set(DETAILS_SEARCH_PARAM, String(characterId));

  return detailsUrl.toString();
}

function createCharacterCsvRow(
  character: CharacterCardModel,
  appBaseUrl: string
): string[] {
  return [
    character.name,
    character.status,
    character.species,
    character.gender,
    character.locationName,
    character.description,
    createCharacterDetailsUrl(character.id, appBaseUrl),
  ];
}

function createCsvLine(values: string[]): string {
  return values.map(escapeCsvValue).join(',');
}

function escapeCsvValue(value: string): string {
  return `"${value.replaceAll('"', '""')}"`;
}
