import type { AttributeSetKey, PackageSetKey } from '../types/Character';

export const ATTRIBUTE_SETS: Record<AttributeSetKey, number[]> = {
  '': [], // Empty set when nothing is selected
  A: [4, 2, 0, -2],
  B: [2, 2, 0, 0],
  C: [4, 4, -2, -2],
};

export const PACKAGE_SETS: Record<PackageSetKey, number[]> = {
  '': [],
  A: [8, 2, 2],
  B: [6, 4, 2],
  C: [4, 6, 2],
};

export const DIFFICULTY_OPTIONS = [
  { value: 5, label: 'Fácil' },
  { value: 10, label: 'Normal' },
  { value: 14, label: 'Difícil' },
  { value: 18, label: 'Épico' },
  { value: 22, label: 'Milagro' },
] as const;
