import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: CharacterCardModel;
}

class CharacterCard extends Component<CharacterCardProps> {
  render() {
    return (
      <article className={styles.card}>
        <img
          className={styles.image}
          src={this.props.character.imageUrl}
          alt={this.props.character.name}
        />

        <div>
          <h3 className={styles.name}>{this.props.character.name}</h3>
          <p className={styles.description}>
            {this.props.character.description}
          </p>
        </div>
      </article>
    );
  }
}

export default CharacterCard;
