import { useCallback, useMemo } from 'react';

interface UseLocalStorageValueResult {
  initialValue: string;
  setValue: (nextValue: string) => void;
}

export function useLocalStorageValue(
  storageKey: string,
  fallbackValue = ''
): UseLocalStorageValueResult {
  const initialValue = useMemo(
    () => localStorage.getItem(storageKey) ?? fallbackValue,
    [fallbackValue, storageKey]
  );

  const setValue = useCallback(
    (nextValue: string) => {
      localStorage.setItem(storageKey, nextValue);
    },
    [storageKey]
  );

  return {
    initialValue,
    setValue,
  };
}
