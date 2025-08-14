import type { Character } from '../types/Character';

export const createEmptyCharacter = (): Character => ({
  id: crypto.randomUUID(),
  name: '',
  attributes: { vigor: null, agility: null, wit: null, intuition: null },
  attributeSet: '',
  packs: { endurance: null, spirit: null, resources: null },
  packageSet: '',
  current: { endurance: 0, spirit: 0, resources: 0 },
  virtues: [
    { id: crypto.randomUUID(), type: 'artifact', text: '' },
    { id: crypto.randomUUID(), type: 'trait', text: '' },
    { id: crypto.randomUUID(), type: 'talent', text: '' },
  ],
  complication: { text: '' },
  notes: '',
  status: 'draft',
});
