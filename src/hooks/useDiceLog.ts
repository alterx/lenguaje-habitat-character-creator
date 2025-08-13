import { useState } from 'react';

export function useDiceLog() {
  const [log, setLog] = useState<{time: number; text: string;}[]>([]);
  
  return {
    log,
    add(entry: string) {
      setLog((prev) => [{time: Date.now(), text: entry}, ...prev].slice(0, 20));
    },
    clear() {
      setLog([]);
    },
  };
}
