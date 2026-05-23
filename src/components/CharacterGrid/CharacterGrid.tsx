import type { CharacterCardModel } from '../../types/character';
import { useSelectedCharactersStore } from '../../store/selectedCharactersStore';
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

  return (
    <ul className={styles.grid} aria-label="Character results">
      {characters.map((character) => (
        <li className={styles.item} key={character.id}>
          <CharacterCard
            character={character}
            isSelected={selectedCharactersById[character.id] !== undefined}
            onSelect={onCharacterSelect}
            onSelectionToggle={toggleCharacterSelection}
          />
        </li>
      ))}
    </ul>
  );
}

export default CharacterGrid;
