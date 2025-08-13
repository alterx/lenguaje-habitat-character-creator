import { useState } from 'react';

export function useDiceLog() {
  const [log, setLog] = useState<string[]>([]);
  
  return {
    log,
    add(entry: string) {
      setLog((prev) => [entry, ...prev].slice(0, 20));
    },
    clear() {
      setLog([]);
    },
  };
}
