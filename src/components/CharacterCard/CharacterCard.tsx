import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: CharacterCardModel;
}

function getStatusClassName(status: CharacterCardModel['status']): string {
  if (status === 'Alive') {
    return styles.alive;
  }

  if (status === 'Dead') {
    return styles.dead;
  }

  return styles.unknown;
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
          <div className={styles.header}>
            <h3 className={styles.name}>{this.props.character.name}</h3>

            <span
              className={`${styles.badge} ${getStatusClassName(
                this.props.character.status
              )}`}
            >
              {this.props.character.status}
            </span>
          </div>

          <p className={styles.description}>
            {this.props.character.description}
          </p>
        </div>
      </article>
    );
  }
}

export default CharacterCard;
