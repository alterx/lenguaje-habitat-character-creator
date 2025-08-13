import type { Character, CharacterAction, AttributeName, PackageName } from '../types/Character';
import { ATTRIBUTE_NAMES, PACKAGE_NAMES } from '../types/Character';

export function characterReducer(state: Character, action: CharacterAction): Character {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.value };

    case 'setStatus':
      return { ...state, status: action.value };

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
        endurance: 0,
        spirit: 0,
        resources: 0,
      } as Character['current'];
      return { ...state, packageSet: action.value, packs, current };
    }
    
    case 'setPack': {
      const packs = { ...state.packs, [action.pack]:  action.value };
      const current = { ...state.current };
      if (action.pack === 'endurance' && action.value != null)
        current.endurance = action.value;
      if (action.pack === 'spirit' && action.value != null)
        current.spirit = action.value;
   
      if (action.pack === 'resources' && action.value != null)
        current.resources = action.value;
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
        attributes: { vigor: null, agility: null, wit: null, intuition: null },
        attributeSet: 'A',
        packs: { endurance: null, spirit: null, resources: null },
        packageSet: 'A',
        current: { endurance: 0, spirit: 0, resources: 0 },
        virtues: [
          { id: crypto.randomUUID(), type: 'artifact', text: '' },
          { id: crypto.randomUUID(), type: 'trait', text: '' },
          { id: crypto.randomUUID(), type: 'talent', text: '' },
        ],
        complication: { text: '' },
        notes: '',
      };
    
    default:
      return state;
  }
}
