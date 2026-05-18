import type { CharacterCardModel } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharacterGrid.module.css';

interface CharacterGridProps {
  characters: CharacterCardModel[];
}

function CharacterGrid({ characters }: CharacterGridProps) {
  return (
    <ul className={styles.grid} aria-label="Character results">
      {characters.map((character) => (
        <li className={styles.item} key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  );
}

export default CharacterGrid;
