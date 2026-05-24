import { useCallback, useEffect, useState } from 'react';
import { fetchCharacterDetails } from '../../api/charactersApi';
import { APP_MESSAGES } from '../../constants/messages';
import { MIN_LOADING_TIME_IN_MS } from '../../constants/timing';
import { useCharacterSearchParams } from '../../hooks/useCharacterSearchParams';
import type { CharacterDetailsModel } from '../../types/character';
import { delay } from '../../utils/delay';
import styles from './CharacterDetailsPanel.module.css';

type CharacterDetailsState =
  | {
      status: 'idle';
    }
  | {
      status: 'loaded';
      characterId: number;
      characterDetails: CharacterDetailsModel;
    }
  | {
      status: 'failed';
      characterId: number;
      errorMessage: string;
    };

interface CharacterDetailRow {
  label: string;
  value: string | number;
}

function getStatusClassName(status: CharacterDetailsModel['status']): string {
  if (status === 'Alive') {
    return styles.alive;
  }

  if (status === 'Dead') {
    return styles.dead;
  }

  return styles.unknown;
}

function formatCreatedDate(createdAt: string): string {
  return createdAt.slice(0, 10);
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

  const [detailsState, setDetailsState] = useState<CharacterDetailsState>({
    status: 'idle',
  });

  useEffect(() => {
    if (selectedCharacterId === null) {
      return;
    }

    let isRequestActive = true;

    async function loadCharacterDetails(characterId: number) {
      try {
        const [loadedCharacterDetails] = await Promise.all([
          fetchCharacterDetails(characterId),
          delay(MIN_LOADING_TIME_IN_MS),
        ]);

        if (!isRequestActive) {
          return;
        }

        setDetailsState({
          status: 'loaded',
          characterId,
          characterDetails: loadedCharacterDetails,
        });
      } catch (error) {
        await delay(MIN_LOADING_TIME_IN_MS);

        if (!isRequestActive) {
          return;
        }

        setDetailsState({
          status: 'failed',
          characterId,
          errorMessage:
            error instanceof Error
              ? error.message
              : APP_MESSAGES.apiErrors.unknown,
        });
      }
    }

    void loadCharacterDetails(selectedCharacterId);

    return () => {
      isRequestActive = false;
    };
  }, [selectedCharacterId]);

  const handleCloseClick = useCallback(() => {
    updateSearchParams({
      detailsId: null,
    });
  }, [updateSearchParams]);

  if (selectedCharacterId === null) {
    return null;
  }

  const characterDetails =
    detailsState.status === 'loaded' &&
    detailsState.characterId === selectedCharacterId
      ? detailsState.characterDetails
      : null;

  const errorMessage =
    detailsState.status === 'failed' &&
    detailsState.characterId === selectedCharacterId
      ? detailsState.errorMessage
      : null;

  const isLoading = characterDetails === null && errorMessage === null;

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
