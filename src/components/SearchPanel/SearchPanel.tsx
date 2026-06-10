import { Component } from 'react';
import type { ChangeEvent, SubmitEvent as ReactSubmitEvent } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
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
          {APP_MESSAGES.search.label}
        </label>

        <div className={styles.field}>
          <input
            id="character-search"
            type="text"
            value={this.state.inputValue}
            placeholder={APP_MESSAGES.search.placeholder}
            onChange={this.handleInputChange}
          />

          <button type="submit">{APP_MESSAGES.search.button}</button>
        </div>

        <p className={styles.hint}>{APP_MESSAGES.search.hint}</p>
      </form>
    );
  }
}

export default SearchPanel;
