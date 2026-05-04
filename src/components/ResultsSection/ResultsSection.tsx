import { Component } from 'react';
import type { CharacterCardModel } from '../../types/character';
import styles from './ResultsSection.module.css';

interface ResultsSectionProps {
  characters: CharacterCardModel[];
  errorMessage: string | null;
  isLoading: boolean;
  searchTerm: string;
}

class ResultsSection extends Component<ResultsSectionProps> {
  renderStatusText() {
    if (this.props.isLoading) {
      return 'Opening portal';
    }

    if (this.props.errorMessage !== null) {
      return 'Portal failed';
    }

    if (this.props.searchTerm.length === 0) {
      return 'Showing first page';
    }

    return `Coordinates locked: "${this.props.searchTerm}"`;
  }

  renderContent() {
    if (this.props.isLoading) {
      return (
        <p className={styles.text}>
          Loading characters from another dimension...
        </p>
      );
    }

    if (this.props.errorMessage !== null) {
      return <p className={styles.error}>{this.props.errorMessage}</p>;
    }

    if (this.props.characters.length === 0) {
      return (
        <p className={styles.text}>
          No characters loaded yet. The portal is suspiciously quiet.
        </p>
      );
    }

    return (
      <ul className={styles.list}>
        {this.props.characters.map((character) => (
          <li className={styles.item} key={character.id}>
            <img src={character.imageUrl} alt={character.name} />

            <div>
              <h3>{character.name}</h3>
              <p>{character.description}</p>
            </div>
          </li>
        ))}
      </ul>
    );
  }

  render() {
    return (
      <div className={styles.placeholder}>
        <div className={styles.portal} aria-hidden="true" />

        <div>
          <p className={styles.status}>{this.renderStatusText()}</p>

          <h2 className={styles.title}>Character results</h2>

          {this.renderContent()}
        </div>
      </div>
    );
  }
}

export default ResultsSection;
