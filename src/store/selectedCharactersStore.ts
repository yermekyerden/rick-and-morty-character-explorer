import { create } from 'zustand';
import type { CharacterCardModel } from '../types/character';

export type SelectedCharactersById = Record<number, CharacterCardModel>;

interface SelectedCharactersStoreState {
  selectedCharactersById: SelectedCharactersById;
  clearSelectedCharacters: () => void;
  isCharacterSelected: (characterId: number) => boolean;
  toggleCharacterSelection: (character: CharacterCardModel) => void;
}

export const useSelectedCharactersStore = create<SelectedCharactersStoreState>(
  (set, get) => ({
    selectedCharactersById: {},

    clearSelectedCharacters: () => {
      set({
        selectedCharactersById: {},
      });
    },

    isCharacterSelected: (characterId) => {
      return isCharacterSelected(get().selectedCharactersById, characterId);
    },

    toggleCharacterSelection: (character) => {
      set((state) => ({
        selectedCharactersById: createToggledSelectedCharactersById(
          state.selectedCharactersById,
          character
        ),
      }));
    },
  })
);

export function getSelectedCharacters(
  selectedCharactersById: SelectedCharactersById
): CharacterCardModel[] {
  return Object.values(selectedCharactersById);
}

export function getSelectedCharacterCount(
  selectedCharactersById: SelectedCharactersById
): number {
  return Object.keys(selectedCharactersById).length;
}

function isCharacterSelected(
  selectedCharactersById: SelectedCharactersById,
  characterId: number
): boolean {
  return selectedCharactersById[characterId] !== undefined;
}

function createToggledSelectedCharactersById(
  selectedCharactersById: SelectedCharactersById,
  character: CharacterCardModel
): SelectedCharactersById {
  const nextSelectedCharactersById = {
    ...selectedCharactersById,
  };

  if (isCharacterSelected(nextSelectedCharactersById, character.id)) {
    delete nextSelectedCharactersById[character.id];
    return nextSelectedCharactersById;
  }

  nextSelectedCharactersById[character.id] = character;

  return nextSelectedCharactersById;
}
