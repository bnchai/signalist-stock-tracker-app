'use client';

import { useCallback, useRef } from 'react';

export default function useDebounce(fn: () => void, ms: number) {
  const timerRef = useRef<NodeJS.Timeout>(undefined);

  const debounceFn = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(fn, ms);
  }, [fn, ms]);

  return debounceFn;
}
