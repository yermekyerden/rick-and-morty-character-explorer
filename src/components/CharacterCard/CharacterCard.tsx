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

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <article className={styles.card}>
      <img
        className={styles.image}
        src={character.imageUrl}
        alt={character.name}
      />

      <div>
        <div className={styles.header}>
          <h3 className={styles.name}>{character.name}</h3>

          <span
            className={`${styles.badge} ${getStatusClassName(character.status)}`}
          >
            {character.status}
          </span>
        </div>

        <p className={styles.description}>{character.description}</p>
      </div>
    </article>
  );
}

export default CharacterCard;
