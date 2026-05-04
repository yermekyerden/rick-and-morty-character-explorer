import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import CharacterCard from '../CharacterCard/CharacterCard';
import styles from './CharacterList.module.css';

interface CharacterListProps {
  characters: CharacterCardModel[];
}

class CharacterList extends Component<CharacterListProps> {
  render() {
    return (
      <ul className={styles.list}>
        {this.props.characters.map((character) => (
          <li key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
    );
  }
}

export default CharacterList;
