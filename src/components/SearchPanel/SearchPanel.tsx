import { Component } from 'react';
import type { ChangeEvent, SubmitEvent as ReactSubmitEvent } from 'react';
import { LAST_SEARCH_TERM_STORAGE_KEY } from '../../constants/storageKeys';
import styles from './SearchPanel.module.css';

interface SearchPanelProps {
  onInitialSearchTermLoaded: (searchTerm: string) => void;
  onSearch: (searchTerm: string) => void;
}

interface SearchPanelState {
  inputValue: string;
}

class SearchPanel extends Component<SearchPanelProps, SearchPanelState> {
  state: SearchPanelState = {
    inputValue: '',
  };

  private lastSubmittedSearchTerm = '';

  componentDidMount() {
    const savedSearchTerm =
      localStorage.getItem(LAST_SEARCH_TERM_STORAGE_KEY) ?? '';

    const trimmedSearchTerm = savedSearchTerm.trim();

    this.lastSubmittedSearchTerm = trimmedSearchTerm;

    this.setState({
      inputValue: trimmedSearchTerm,
    });

    this.props.onInitialSearchTermLoaded(trimmedSearchTerm);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event: ReactSubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearchTerm = this.state.inputValue.trim();

    if (trimmedSearchTerm === this.lastSubmittedSearchTerm) {
      return;
    }

    localStorage.setItem(LAST_SEARCH_TERM_STORAGE_KEY, trimmedSearchTerm);

    this.lastSubmittedSearchTerm = trimmedSearchTerm;

    this.setState({
      inputValue: trimmedSearchTerm,
    });

    this.props.onSearch(trimmedSearchTerm);
  };

  render() {
    return (
      <form className={styles.panel} onSubmit={this.handleSubmit}>
        <label className={styles.label} htmlFor="character-search">
          Character name
        </label>

        <div className={styles.field}>
          <input
            id="character-search"
            type="text"
            value={this.state.inputValue}
            placeholder="Try Rick, Morty, Summer..."
            onChange={this.handleInputChange}
          />

          <button type="submit">Search</button>
        </div>

        <p className={styles.hint}>
          Your last portal coordinates are saved in this browser.
        </p>
      </form>
    );
  }
}

export default SearchPanel;
