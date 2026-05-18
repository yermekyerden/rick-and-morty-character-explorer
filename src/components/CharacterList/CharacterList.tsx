import type { CharacterCardModel } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharacterList.module.css';

interface CharacterListProps {
  characters: CharacterCardModel[];
}

function CharacterList({ characters }: CharacterListProps) {
  return (
    <ul className={styles.list}>
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard character={character} />
        </li>
      ))}
    </ul>
  );
}

export default CharacterList;
