// English keys for data structures
export const ATTRIBUTE_NAMES = ['vigor', 'agility', 'wit', 'intuition'] as const;
export const PACKAGE_NAMES = ['endurance', 'spirit', 'resources'] as const;
export const VIRTUE_TYPES = ['artifact', 'magic', 'trait', 'talent'] as const;

// Spanish labels for display
export const ATTRIBUTE_LABELS = {
  vigor: 'Vigor',
  agility: 'Agilidad', 
  wit: 'Ingenio',
  intuition: 'Intuición'
} as const;

export const PACKAGE_LABELS = {
  endurance: 'Aguante',
  spirit: 'Espíritu',
  resources: 'Recursos'
} as const;

export const VIRTUE_TYPE_LABELS = {
  artifact: 'Artefacto',
  magic: 'Magia',
  trait: 'Rasgo',
  talent: 'Talento'
} as const;

export type AttributeName = (typeof ATTRIBUTE_NAMES)[number];
export type PackageName = (typeof PACKAGE_NAMES)[number];
export type VirtueType = (typeof VIRTUE_TYPES)[number];

export type AttributeSetKey = '' | 'A' | 'B' | 'C';
export type PackageSetKey = ''| 'A' | 'B' | 'C';

export interface Virtue {
  id: string;
  type: VirtueType;
  text: string;
}

export interface Complication {
  text: string;
}

export type Status = 'draft' | 'ready';

export interface Character {
  id: string;
  name: string;
  attributes: Record<AttributeName, number | null>; // modifiers
  attributeSet: AttributeSetKey;
  packs: Record<PackageName, number | null>; // maximum/base values
  packageSet: PackageSetKey;
  current: Record<PackageName, number>; // current pool values
  virtues: Virtue[]; // exactly 3
  complication: Complication;
  notes: string;
  status: Status;
}

export type CharacterAction =
  | { type: 'setName'; value: string }
  | { type: 'setStatus'; value: Status }
  | { type: 'setAttributeSet'; value: AttributeSetKey }
  | { type: 'setAttribute'; attribute: AttributeName; value: number | null }
  | { type: 'setPackageSet'; value: PackageSetKey }
  | { type: 'setPack'; pack: PackageName; value: number | null }
  | { type: 'setCurrent'; pack: PackageName; value: number }
  | { type: 'setVirtue'; id: string; patch: Partial<Virtue> }
  | { type: 'addVirtue' }
  | { type: 'removeVirtue'; id: string }
  | { type: 'setComplication'; value: string }
  | { type: 'setNotes'; value: string }
  | { type: 'load'; value: Character }
  | { type: 'reset' };
