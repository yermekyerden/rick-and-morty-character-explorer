import { useCallback, useMemo } from 'react';

interface UseLocalStorageValueResult {
  initialValue: string;
  setValue: (nextValue: string) => void;
}

function getStoredValue(storageKey: string, fallbackValue: string): string {
  try {
    return localStorage.getItem(storageKey) ?? fallbackValue;
  } catch {
    return fallbackValue;
  }
}

function setStoredValue(storageKey: string, nextValue: string): void {
  try {
    localStorage.setItem(storageKey, nextValue);
  } catch {
    return;
  }
}

export function useLocalStorageValue(
  storageKey: string,
  fallbackValue = ''
): UseLocalStorageValueResult {
  const initialValue = useMemo(
    () => getStoredValue(storageKey, fallbackValue),
    [fallbackValue, storageKey]
  );

  const setValue = useCallback(
    (nextValue: string) => {
      setStoredValue(storageKey, nextValue);
    },
    [storageKey]
  );

  return {
    initialValue,
    setValue,
  };
}
