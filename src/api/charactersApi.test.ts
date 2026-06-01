import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../constants/messages';
import {
  testCharacterApiResponse,
  testCharacterCard,
  testCharacterDetails,
} from '../test/testCharacters';
import { fetchCharacterDetails, fetchCharacterPage } from './charactersApi';

const allCharactersRequestUrl =
  'https://rickandmortyapi.com/api/character?page=1';

const mortySecondPageRequestUrl =
  'https://rickandmortyapi.com/api/character?page=2&name=Morty';

const rickDetailsRequestUrl = 'https://rickandmortyapi.com/api/character/1';

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

describe('fetchCharacterPage', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('fetches requested page and returns pagination metadata', async () => {
    fetchMock.mockResolvedValue(createJsonResponse(testCharacterApiResponse));

    const characterPage = await fetchCharacterPage({
      searchTerm: '  Morty  ',
      page: 2,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(mortySecondPageRequestUrl);
    expect(characterPage).toEqual({
      characters: [testCharacterCard],
      currentPage: 2,
      totalPages: testCharacterApiResponse.info.pages,
      totalCount: testCharacterApiResponse.info.count,
    });
  });

  it('normalizes invalid page number to first page', async () => {
    fetchMock.mockResolvedValue(createJsonResponse(testCharacterApiResponse));

    const characterPage = await fetchCharacterPage({
      searchTerm: '',
      page: -10,
    });

    expect(fetchMock).toHaveBeenCalledWith(allCharactersRequestUrl);
    expect(characterPage.currentPage).toBe(1);
  });

  it('throws rate limit message for 429 response', async () => {
    fetchMock.mockResolvedValue(createEmptyResponse(429));

    await expect(
      fetchCharacterPage({
        searchTerm: '',
        page: 5,
      })
    ).rejects.toThrow(APP_MESSAGES.apiErrors.networkOrRateLimit);
  });

  it('throws network or rate limit message when fetch fails', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(
      fetchCharacterPage({
        searchTerm: '',
        page: 5,
      })
    ).rejects.toThrow(APP_MESSAGES.apiErrors.networkOrRateLimit);
  });
});

describe('fetchCharacterDetails', () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  it('fetches character details by id', async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse(testCharacterApiResponse.results[0])
    );

    const details = await fetchCharacterDetails(1);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(rickDetailsRequestUrl);
    expect(details).toEqual(testCharacterDetails);
  });

  it('normalizes invalid character id to first character', async () => {
    fetchMock.mockResolvedValue(
      createJsonResponse(testCharacterApiResponse.results[0])
    );

    await fetchCharacterDetails(-100);

    expect(fetchMock).toHaveBeenCalledWith(rickDetailsRequestUrl);
  });

  it('throws friendly message when details request fails', async () => {
    fetchMock.mockResolvedValue(createEmptyResponse(500));

    await expect(fetchCharacterDetails(1)).rejects.toThrow(
      APP_MESSAGES.apiErrors.generic
    );
  });
});
