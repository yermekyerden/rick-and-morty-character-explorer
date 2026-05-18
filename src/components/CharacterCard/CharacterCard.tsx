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
    <article
      className={`${styles.card} ${getStatusClassName(character.status)}`}
      aria-label={`${character.name} character dossier`}
    >
      <div className={styles.imageFrame}>
        <img
          className={styles.image}
          src={character.imageUrl}
          alt={character.name}
        />

        <span className={styles.statusBadge}>{character.status}</span>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{character.name}</h3>

        <dl className={styles.metaList}>
          <div className={styles.metaRow}>
            <dt>Species</dt>
            <dd>{character.species}</dd>
          </div>

          <div className={styles.metaRow}>
            <dt>Gender</dt>
            <dd>{character.gender}</dd>
          </div>

          <div className={styles.metaRow}>
            <dt>Location</dt>
            <dd className={styles.locationValue}>{character.locationName}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

export default CharacterCard;
