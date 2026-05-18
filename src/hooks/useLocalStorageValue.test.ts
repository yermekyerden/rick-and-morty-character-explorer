import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useLocalStorageValue } from './useLocalStorageValue';

const STORAGE_KEY = 'testStorageKey';

describe('useLocalStorageValue', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns fallback value when localStorage has no value', () => {
    const fallbackValue = 'fallback';

    const { result } = renderHook(() =>
      useLocalStorageValue(STORAGE_KEY, fallbackValue)
    );

    expect(result.current.initialValue).toBe(fallbackValue);
  });

  it('returns stored value from localStorage', () => {
    const storedValue = 'Rick';

    localStorage.setItem(STORAGE_KEY, storedValue);

    const { result } = renderHook(() => useLocalStorageValue(STORAGE_KEY));

    expect(result.current.initialValue).toBe(storedValue);
  });

  it('stores new value in localStorage', () => {
    const nextValue = 'Morty';

    const { result } = renderHook(() => useLocalStorageValue(STORAGE_KEY));

    act(() => {
      result.current.setValue(nextValue);
    });

    expect(localStorage.getItem(STORAGE_KEY)).toBe(nextValue);
  });
});
