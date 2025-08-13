import { PackageControl } from '../ui/PackageControl';
import { PACKAGE_NAMES } from '../../types/Character';
import type { Character, CharacterAction } from '../../types/Character';

interface AdventurePointsProps {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
}

export function AdventurePoints({ character, dispatch }: AdventurePointsProps) {
  return (
    <section className="bg-parchment-300 bg-paper-texture backdrop-blur-sm rounded-2xl border border-parchment-600 p-4 shadow-lg">
      <h3 className="font-semibold mb-2 text-forest-800 font-serif">
        Puntos de Aventura
      </h3>
      <ul className="space-y-2">
        {PACKAGE_NAMES.map((p) => (
          <PackageControl
            key={p}
            name={p}
            current={character.current[p] ?? 0}
            max={character.packs[p]}
            onChange={(value) =>
              dispatch({ type: 'setCurrent', pack: p, value })
            }
          />
        ))}
      </ul>
    </section>
  );
}
