import type { CharacterCardModel } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharacterGrid.module.css';

interface CharacterGridProps {
  characters: CharacterCardModel[];
  onCharacterSelect?: (characterId: number) => void;
}

function CharacterGrid({ characters, onCharacterSelect }: CharacterGridProps) {
  return (
    <ul className={styles.grid} aria-label="Character results">
      {characters.map((character) => (
        <li className={styles.item} key={character.id}>
          <CharacterCard character={character} onSelect={onCharacterSelect} />
        </li>
      ))}
    </ul>
  );
}

export default CharacterGrid;
