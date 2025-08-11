// Default character template

import type { Character } from '../types/Character';

export const createEmptyCharacter = (): Character => ({
  id: crypto.randomUUID(),
  name: '',
  attributes: { Vigor: null, Agilidad: null, Ingenio: null, Intuición: null },
  attributeSet: 'A',
  packs: { Aguante: null, Espíritu: null, Recursos: null },
  packageSet: 'A',
  current: { Aguante: 0, Espíritu: 0, Recursos: 0 },
  virtues: [
    { id: crypto.randomUUID(), type: 'Artefacto', text: '' },
    { id: crypto.randomUUID(), type: 'Rasgo', text: '' },
    { id: crypto.randomUUID(), type: 'Talento', text: '' },
  ],
  complication: { text: '' },
  notes: '',
});
