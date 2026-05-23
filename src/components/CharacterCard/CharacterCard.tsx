import type { ChangeEvent, MouseEvent } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import type { CharacterCardModel } from '../../types/character';
import styles from './CharacterCard.module.css';

interface CharacterCardProps {
  character: CharacterCardModel;
  isSelected?: boolean;
  onSelect?: (characterId: number) => void;
  onSelectionToggle?: (character: CharacterCardModel) => void;
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

function createCardClassName({
  canOpenDossier,
  isSelected,
  status,
}: {
  canOpenDossier: boolean;
  isSelected: boolean;
  status: CharacterCardModel['status'];
}): string {
  const classNames = [styles.card, getStatusClassName(status)];

  if (isSelected) {
    classNames.push(styles.selected);
  }

  if (canOpenDossier) {
    classNames.push(styles.interactive);
  }

  return classNames.join(' ');
}

function CharacterCard({
  character,
  isSelected = false,
  onSelect,
  onSelectionToggle,
}: CharacterCardProps) {
  const canOpenDossier = Boolean(onSelect);
  const canToggleSelection = Boolean(onSelectionToggle);

  function openCharacterDossier() {
    if (onSelect) {
      onSelect(character.id);
    }
  }

  function toggleCharacterSelection() {
    if (onSelectionToggle) {
      onSelectionToggle(character);
    }
  }

  function handleCardClick() {
    openCharacterDossier();
  }

  function handleDetailsButtonClick(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    openCharacterDossier();
  }

  function handleSelectionChange(event: ChangeEvent<HTMLInputElement>) {
    event.stopPropagation();
    toggleCharacterSelection();
  }

  function handleSelectionClick(event: MouseEvent<HTMLInputElement>) {
    event.stopPropagation();
  }

  function handleSelectionLabelClick(event: MouseEvent<HTMLLabelElement>) {
    event.stopPropagation();
  }

  const cardClassName = createCardClassName({
    canOpenDossier,
    isSelected,
    status: character.status,
  });

  return (
    <article
      className={cardClassName}
      aria-label={`${character.name} character dossier`}
      onClick={canOpenDossier ? handleCardClick : undefined}
    >
      {canToggleSelection ? (
        <label
          className={styles.selectionControl}
          onClick={handleSelectionLabelClick}
        >
          <input
            className={styles.selectionInput}
            type="checkbox"
            checked={isSelected}
            aria-label={`Select ${character.name}`}
            onChange={handleSelectionChange}
            onClick={handleSelectionClick}
          />

          <span className={styles.selectionBox} aria-hidden="true" />
        </label>
      ) : null}

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

        {canOpenDossier ? (
          <button
            className={styles.detailsButton}
            type="button"
            aria-label={APP_MESSAGES.characterCard.openDetailsLabel(
              character.name
            )}
            onClick={handleDetailsButtonClick}
          >
            {APP_MESSAGES.characterCard.openDetails}
          </button>
        ) : null}
      </div>
    </article>
  );
}

export default CharacterCard;
