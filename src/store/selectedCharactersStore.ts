import { create } from 'zustand';
import type { CharacterCardModel } from '../types/character';

interface SelectedCharactersState {
  selectedCharactersById: Record<number, CharacterCardModel>;
  clearSelectedCharacters: () => void;
  isCharacterSelected: (characterId: number) => boolean;
  toggleCharacterSelection: (character: CharacterCardModel) => void;
}

export const useSelectedCharactersStore = create<SelectedCharactersState>(
  (set, get) => ({
    selectedCharactersById: {},

    clearSelectedCharacters: () => {
      set({
        selectedCharactersById: {},
      });
    },

    isCharacterSelected: (characterId) => {
      return get().selectedCharactersById[characterId] !== undefined;
    },

    toggleCharacterSelection: (character) => {
      set((state) => {
        const nextSelectedCharactersById = {
          ...state.selectedCharactersById,
        };

        if (nextSelectedCharactersById[character.id] !== undefined) {
          delete nextSelectedCharactersById[character.id];
        } else {
          nextSelectedCharactersById[character.id] = character;
        }

        return {
          selectedCharactersById: nextSelectedCharactersById,
        };
      });
    },
  })
);

export function getSelectedCharacters(
  selectedCharactersById: Record<number, CharacterCardModel>
): CharacterCardModel[] {
  return Object.values(selectedCharactersById);
}

export function getSelectedCharacterCount(
  selectedCharactersById: Record<number, CharacterCardModel>
): number {
  return Object.keys(selectedCharactersById).length;
}
