import { useQuery } from '@tanstack/react-query';
import { fetchCharacterDetails } from '../api/charactersApi';
import { APP_MESSAGES } from '../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../constants/timing';
import type { CharacterDetailsModel } from '../types/character';
import { delay } from '../utils/delay';
import { CHARACTER_QUERY_KEYS } from './queryKeys';

interface UseCharacterDetailsQueryOptions {
  characterId: number | null;
}

async function loadCharacterDetails(
  characterId: number | null
): Promise<CharacterDetailsModel> {
  if (characterId === null) {
    throw new Error(APP_MESSAGES.apiErrors.unknown);
  }

  const [characterDetails] = await Promise.all([
    fetchCharacterDetails(characterId),
    delay(MIN_LOADING_TIME_IN_MS),
  ]);

  return characterDetails;
}

export function useCharacterDetailsQuery({
  characterId,
}: UseCharacterDetailsQueryOptions) {
  return useQuery<CharacterDetailsModel>({
    queryKey:
      characterId === null
        ? CHARACTER_QUERY_KEYS.detailsRoot()
        : CHARACTER_QUERY_KEYS.details(characterId),
    queryFn: () => loadCharacterDetails(characterId),
    enabled: characterId !== null,
  });
}
