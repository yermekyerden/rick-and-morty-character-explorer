import { useSelectedCharactersStore } from '../../store/selectedCharactersStore';
import type { CharacterCardModel } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharacterGrid.module.css';

interface CharacterGridProps {
  characters: CharacterCardModel[];
  onCharacterSelect?: (characterId: number) => void;
}

function CharacterGrid({ characters, onCharacterSelect }: CharacterGridProps) {
  const selectedCharactersById = useSelectedCharactersStore(
    (state) => state.selectedCharactersById
  );
  const toggleCharacterSelection = useSelectedCharactersStore(
    (state) => state.toggleCharacterSelection
  );

  function isCharacterSelected(characterId: number): boolean {
    return selectedCharactersById[characterId] !== undefined;
  }

  return (
    <ul className={styles.grid} aria-label="Character results">
      {characters.map((character) => (
        <li className={styles.item} key={character.id}>
          <CharacterCard
            character={character}
            isSelected={isCharacterSelected(character.id)}
            onSelect={onCharacterSelect}
            onSelectionToggle={toggleCharacterSelection}
          />
        </li>
      ))}
    </ul>
  );
}

export default CharacterGrid;
