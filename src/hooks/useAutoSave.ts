// Auto-save hook for characters

import { useEffect } from 'react';
import type { Character } from '../types/Character';
import { saveCharactersToLocal } from '../utils/localStorage';

export function useAutoSave(characters: Character[], selectedId: string) {
  useEffect(() => {
    saveCharactersToLocal(characters, selectedId);
  }, [characters, selectedId]);
}
