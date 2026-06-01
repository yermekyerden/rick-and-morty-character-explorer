import { useCallback } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import { useCharacterSearchParams } from '../../hooks/useCharacterSearchParams';
import { useCharacterDetailsQuery } from '../../query/useCharacterDetailsQuery';
import {
  CHARACTER_STATUS,
  type CharacterDetailsModel,
} from '../../types/character';
import styles from './CharacterDetailsPanel.module.css';

const ISO_DATE_LENGTH = 10;

interface CharacterDetailRow {
  label: string;
  value: string | number;
}

function getStatusClassName(status: CharacterDetailsModel['status']): string {
  if (status === CHARACTER_STATUS.alive) {
    return styles.alive;
  }

  if (status === CHARACTER_STATUS.dead) {
    return styles.dead;
  }

  return styles.unknown;
}

function formatCreatedDate(createdAt: string): string {
  return createdAt.slice(0, ISO_DATE_LENGTH);
}

function getCharacterDetailsErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return APP_MESSAGES.apiErrors.unknown;
}

function getLoadedCharacterDetails(
  characterDetails: CharacterDetailsModel | undefined,
  errorMessage: string | null
): CharacterDetailsModel | null {
  if (errorMessage !== null || characterDetails === undefined) {
    return null;
  }

  return characterDetails;
}

function createCharacterDetailRows(
  characterDetails: CharacterDetailsModel
): CharacterDetailRow[] {
  return [
    {
      label: APP_MESSAGES.characterDetails.fields.type,
      value: characterDetails.type,
    },
    {
      label: APP_MESSAGES.characterDetails.fields.origin,
      value: characterDetails.originName,
    },
    {
      label: APP_MESSAGES.characterDetails.fields.location,
      value: characterDetails.locationName,
    },
    {
      label: APP_MESSAGES.characterDetails.fields.episodes,
      value: characterDetails.episodeCount,
    },
    {
      label: APP_MESSAGES.characterDetails.fields.created,
      value: formatCreatedDate(characterDetails.createdAt),
    },
  ];
}

function renderDetailRows(detailRows: CharacterDetailRow[]) {
  return detailRows.map((detailRow) => (
    <div className={styles.metaRow} key={detailRow.label}>
      <dt>{detailRow.label}</dt>
      <dd>{detailRow.value}</dd>
    </div>
  ));
}

function CharacterDetailsPanel() {
  const { selectedCharacterId, updateSearchParams } =
    useCharacterSearchParams();

  const characterDetailsQuery = useCharacterDetailsQuery({
    characterId: selectedCharacterId,
  });

  const handleCloseClick = useCallback(() => {
    updateSearchParams({
      detailsId: null,
    });
  }, [updateSearchParams]);

  if (selectedCharacterId === null) {
    return null;
  }

  const errorMessage = characterDetailsQuery.isError
    ? getCharacterDetailsErrorMessage(characterDetailsQuery.error)
    : null;

  const characterDetails = getLoadedCharacterDetails(
    characterDetailsQuery.data,
    errorMessage
  );

  const isLoading = characterDetailsQuery.isPending;

  return (
    <aside className={styles.panel} aria-label="Character details">
      <div className={styles.topBar}>
        <p className={styles.kicker}>{APP_MESSAGES.characterDetails.title}</p>

        <button
          className={styles.closeButton}
          type="button"
          aria-label={APP_MESSAGES.characterDetails.closeLabel}
          onClick={handleCloseClick}
        >
          {APP_MESSAGES.characterDetails.close}
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loadingState} aria-live="polite">
          <div className={styles.loadingImage} aria-hidden="true" />
          <div className={styles.loadingLine} aria-hidden="true" />
          <div className={styles.loadingLineShort} aria-hidden="true" />

          <p className={styles.stateText}>
            {APP_MESSAGES.characterDetails.loading}
          </p>
        </div>
      ) : null}

      {!isLoading && errorMessage !== null ? (
        <div className={styles.errorState} aria-live="assertive">
          <div className={styles.errorOrb} aria-hidden="true" />

          <h3 className={styles.errorTitle}>
            {APP_MESSAGES.characterDetails.errorTitle}
          </h3>

          <p className={styles.stateText}>{errorMessage}</p>
        </div>
      ) : null}

      {!isLoading && errorMessage === null && characterDetails !== null ? (
        <article
          className={`${styles.dossier} ${getStatusClassName(
            characterDetails.status
          )}`}
        >
          <div className={styles.imageFrame}>
            <img
              className={styles.image}
              src={characterDetails.imageUrl}
              alt={characterDetails.name}
            />

            <span className={styles.statusBadge}>
              {characterDetails.status}
            </span>
          </div>

          <div className={styles.content}>
            <div className={styles.identity}>
              <p className={styles.identityLabel}>Dossier subject</p>

              <h3 className={styles.name}>{characterDetails.name}</h3>

              <div className={styles.factList}>
                <span className={styles.factBadge}>
                  {characterDetails.species}
                </span>

                <span className={styles.factBadge}>
                  {characterDetails.gender}
                </span>
              </div>
            </div>

            <dl className={styles.metaList}>
              {renderDetailRows(createCharacterDetailRows(characterDetails))}
            </dl>
          </div>
        </article>
      ) : null}
    </aside>
  );
}

export default CharacterDetailsPanel;
