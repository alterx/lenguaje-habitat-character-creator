import type { Character } from '../types/Character';

export function loadCharactersFromLocal(): Character[] {
  const raw = localStorage.getItem('mn-char-list');
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function loadSelectedIdFromLocal(): string | null {
  return localStorage.getItem('mn-char-selected');
}

export function saveCharactersToLocal(characters: Character[], selectedId: string) {
  localStorage.setItem('mn-char-list', JSON.stringify(characters));
  localStorage.setItem('mn-char-selected', selectedId);
}
