import type { Character, CharacterAction, AttributeName, PackageName } from '../types/Character';
import { ATTRIBUTE_NAMES, PACKAGE_NAMES } from '../types/Character';

export function characterReducer(state: Character, action: CharacterAction): Character {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.value };
    
    case 'setAttributeSet': {
      const attributes = ATTRIBUTE_NAMES.reduce(
        (acc, a) => ({ ...acc, [a]: null }),
        {} as Record<AttributeName, number | null>
      );
      return { ...state, attributeSet: action.value, attributes };
    }
    
    case 'setAttribute': {
      const attributes = {
        ...state.attributes,
        [action.attribute]: action.value,
      };
      return { ...state, attributes };
    }
    
    case 'setPackageSet': {
      const packs = PACKAGE_NAMES.reduce(
        (acc, p) => ({ ...acc, [p]: null }),
        {} as Record<PackageName, number | null>
      );
      const current = {
        Aguante: 0,
        Espíritu: 0,
        Recursos: 0,
      } as Character['current'];
      return { ...state, packageSet: action.value, packs, current };
    }
    
    case 'setPack': {
      const packs = { ...state.packs, [action.pack]:  action.value };
      const current = { ...state.current };
      if (action.pack === 'Aguante' && action.value != null)
        current.Aguante = action.value;
      if (action.pack === 'Espíritu' && action.value != null)
        current.Espíritu = action.value;
   
      if (action.pack === 'Recursos' && action.value != null)
        current.Recursos = action.value;
      return { ...state, packs, current };
    }
    
    case 'setCurrent': {
      const current = {
        ...state.current,
        [action.pack]: Math.max(0, action.value),
      } as Character['current'];
      return { ...state, current };
    }
    
    case 'setVirtue': {
      const virtues = state.virtues.map((v) =>
        v.id === action.id ? { ...v, ...action.patch } : v
      );
      return { ...state, virtues };
    }
    
    case 'addVirtue': {
      if (state.virtues.length >= 3) return state;
      return {
        ...state,
        virtues: [
          ...state.virtues,
        ],
      };
    }
    
    case 'removeVirtue': {
      if (state.virtues.length <= 1) return state;
      return {
        ...state,
        virtues: state.virtues.filter((v) => v.id !== action.id),
      };
    }
    
    case 'setComplication':
      return { ...state, complication: { text: action.value } };
    
    case 'setNotes':
      return { ...state, notes: action.value };
    
    case 'load':
      return action.value;
    
    case 'reset':
      return {
        ...state,
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
      };
    
    default:
      return state;
  }
}
