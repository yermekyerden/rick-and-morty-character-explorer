import { beforeEach, describe, expect, it, vi } from 'vitest';
import { APP_MESSAGES } from '../constants/messages';
import {
  testCharacterApiResponse,
  testCharacterCard,
  testCharacterDetails,
} from '../test/testCharacters';
import {
  fetchCharacterCards,
  fetchCharacterDetails,
  fetchCharacterPage,
} from './charactersApi';

const allCharactersRequestUrl =
  'https://rickandmortyapi.com/api/character?page=1';

const rickSearchRequestUrl =
  'https://rickandmortyapi.com/api/character?page=1&name=Rick';

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
