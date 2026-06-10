import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../constants/messages';
import {
  testCharacterApiResponse,
  testCharacterCard,
} from '../test/testCharacters';
import { fetchCharacterCards } from './charactersApi';

const allCharactersRequestUrl =
  'https://rickandmortyapi.com/api/character?page=1';

const rickSearchRequestUrl =
  'https://rickandmortyapi.com/api/character?page=1&name=Rick';

function createJsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function createEmptyResponse(status: number): Response {
  return new Response(null, {
    status,
  });
}

describe('fetchCharacterCards', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('fetches first page of all characters when search term is empty', async () => {
    fetchMock.mockResolvedValue(createJsonResponse(testCharacterApiResponse));

    const characters = await fetchCharacterCards('');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(allCharactersRequestUrl);
    expect(characters).toEqual([testCharacterCard]);
  });

  it('fetches first page of matching characters when search term is provided', async () => {
    fetchMock.mockResolvedValue(createJsonResponse(testCharacterApiResponse));

    const characters = await fetchCharacterCards('  Rick  ');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(rickSearchRequestUrl);
    expect(characters).toEqual([testCharacterCard]);
  });

  it('throws not found message for 404 response', async () => {
    fetchMock.mockResolvedValue(createEmptyResponse(404));

    await expect(fetchCharacterCards('Nobody')).rejects.toThrow(
      APP_MESSAGES.apiErrors.notFound
    );
  });

  it('throws generic error message for non-404 failed response', async () => {
    fetchMock.mockResolvedValue(createEmptyResponse(500));

    await expect(fetchCharacterCards('Rick')).rejects.toThrow(
      APP_MESSAGES.apiErrors.generic
    );
  });
});
