import { Component } from 'react';
import type { ChangeEvent, SubmitEvent as ReactSubmitEvent } from 'react';
import styles from './SearchPanel.module.css';

interface SearchPanelProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchPanelState {
  inputValue: string;
}

class SearchPanel extends Component<SearchPanelProps, SearchPanelState> {
  state: SearchPanelState = {
    inputValue: '',
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      inputValue: event.target.value,
    });
  };

  handleSubmit = (event: ReactSubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedSearchTerm = this.state.inputValue.trim();

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
          Type a name and launch the portal. No guarantees about who comes out.
        </p>
      </form>
    );
  }
}

export default SearchPanel;
