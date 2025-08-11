// Utility functions for the character creator

import type { Character } from '../types/Character';

// Format modifier values for display
export function formatModifier(value: number | null): string {
  if (value == null) return '—';
  return (value >= 0 ? '+' : '') + value;
}

// Download a file with given content
export function download(filename: string, text: string) {
  const el = document.createElement('a');
  el.setAttribute(
    'href',
    'data:text/json;charset=utf-8,' + encodeURIComponent(text)
  );
  el.setAttribute('download', filename);
  el.style.display = 'none';
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}

// Encode character for sharing via URL
export function encodeShare(state: Character): string {
  const json = JSON.stringify(state);
  return btoa(unescape(encodeURIComponent(json)));
}

// Decode character from URL hash
export function decodeShare(hash: string): Character | null {
  try {
    const json = decodeURIComponent(escape(atob(hash)));
    const parsed = JSON.parse(json);
    return parsed;
  } catch {
    return null;
  }
}

// Build count map for duplicate values in sets (e.g., [4,4,-2,-2])
export function buildCountMap(nums: number[]): Record<number, number> {
  const m: Record<number, number> = {};
  for (const n of nums) m[n] = (m[n] ?? 0) + 1;
  return m;
}

// Roll a d20
export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}
