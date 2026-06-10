import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { APP_MESSAGES } from '../../constants/messages';
import { LAST_SEARCH_TERM_STORAGE_KEY } from '../../constants/storageKeys';
import { useLocalStorageValue } from '../../hooks/useLocalStorageValue';
import styles from './SearchPanel.module.css';

interface SearchPanelProps {
  initialSearchTerm?: string;
  onInitialSearchTermLoaded: (searchTerm: string) => void;
  onSearch: (searchTerm: string) => void;
}

function SearchPanel({
  initialSearchTerm,
  onInitialSearchTermLoaded,
  onSearch,
}: SearchPanelProps) {
  const { initialValue, setValue } = useLocalStorageValue(
    LAST_SEARCH_TERM_STORAGE_KEY
  );

  const resolvedInitialSearchTerm = useMemo(() => {
    return (initialSearchTerm ?? initialValue).trim();
  }, [initialSearchTerm, initialValue]);

  const [inputValue, setInputValue] = useState(resolvedInitialSearchTerm);

  const lastSubmittedSearchTerm = useRef(resolvedInitialSearchTerm);
  const hasLoadedInitialSearchTerm = useRef(false);

  useEffect(() => {
    if (hasLoadedInitialSearchTerm.current) {
      return;
    }

    hasLoadedInitialSearchTerm.current = true;
    onInitialSearchTermLoaded(resolvedInitialSearchTerm);
  }, [onInitialSearchTermLoaded, resolvedInitialSearchTerm]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedSearchTerm = inputValue.trim();

    if (trimmedSearchTerm === lastSubmittedSearchTerm.current) {
      return;
    }

    setValue(trimmedSearchTerm);

    lastSubmittedSearchTerm.current = trimmedSearchTerm;

    setInputValue(trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
  }

  return (
    <form className={styles.panel} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="character-search">
        {APP_MESSAGES.search.label}
      </label>

      <div className={styles.field}>
        <input
          id="character-search"
          type="text"
          value={inputValue}
          placeholder={APP_MESSAGES.search.placeholder}
          onChange={handleInputChange}
        />

        <button type="submit">{APP_MESSAGES.search.button}</button>
      </div>

      <p className={styles.hint}>{APP_MESSAGES.search.hint}</p>
    </form>
  );
}

export default SearchPanel;
