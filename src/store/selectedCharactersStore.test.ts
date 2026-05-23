import { beforeEach, describe, expect, it } from 'vitest';
import {
  testCharacterCard,
  testMortyCharacterCard,
} from '../test/testCharacters';
import {
  getSelectedCharacterCount,
  getSelectedCharacters,
  useSelectedCharactersStore,
} from './selectedCharactersStore';

describe('useSelectedCharactersStore', () => {
  beforeEach(() => {
    useSelectedCharactersStore.setState({
      selectedCharactersById: {},
    });
  });

  it('selects a character', () => {
    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    const state = useSelectedCharactersStore.getState();

    expect(state.selectedCharactersById[testCharacterCard.id]).toEqual(
      testCharacterCard
    );
    expect(state.isCharacterSelected(testCharacterCard.id)).toBe(true);
  });

  it('unselects an already selected character', () => {
    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    const state = useSelectedCharactersStore.getState();

    expect(state.selectedCharactersById[testCharacterCard.id]).toBeUndefined();
    expect(state.isCharacterSelected(testCharacterCard.id)).toBe(false);
  });

  it('keeps multiple selected characters', () => {
    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testMortyCharacterCard);

    const selectedCharactersById =
      useSelectedCharactersStore.getState().selectedCharactersById;

    expect(getSelectedCharacters(selectedCharactersById)).toEqual([
      testCharacterCard,
      testMortyCharacterCard,
    ]);
    expect(getSelectedCharacterCount(selectedCharactersById)).toBe(2);
  });

  it('clears all selected characters', () => {
    useSelectedCharactersStore
      .getState()
      .toggleCharacterSelection(testCharacterCard);

    useSelectedCharactersStore.getState().clearSelectedCharacters();

    const selectedCharactersById =
      useSelectedCharactersStore.getState().selectedCharactersById;

    expect(selectedCharactersById).toEqual({});
    expect(getSelectedCharacterCount(selectedCharactersById)).toBe(0);
  });
});
