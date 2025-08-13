import { ATTRIBUTE_NAMES, PACKAGE_NAMES } from '../../types/Character';
import { formatModifier } from '../../utils/gameUtils';
import type { Character } from '../../types/Character';

interface CharacterSheetProps {
  character: Character;
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  return (
    <div
      id="sheet"
      className="bg-parchment-100 bg-paper-texture rounded-2xl border-2 border-forest-700 shadow-2xl p-4 sm:p-6 print:shadow-none print:bg-white"
    >
      <div className="flex items-start justify-between gap-4 sm:gap-6 flex-wrap mb-4 sm:mb-6">
        <div className="flex-1 min-w-[200px] sm:min-w-[260px]">
          <div className="bg-parchment-50 rounded-xl border border-forest-700 p-3 sm:p-4 mb-3 sm:mb-4 shadow-lg">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight mb-1 text-forest-900 text-center font-serif">
              {character.name || 'NOMBRE DEL PERSONAJE'}
            </h2>
          </div>
          <div className="bg-parchment-50 rounded-xl border border-forest-700 p-2 sm:p-3 shadow-lg">
            <p className="text-xs sm:text-sm text-forest-700 font-medium">
              {character.notes || '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="bg-parchment-50 rounded-xl border border-forest-700 p-3 sm:p-4 shadow-lg">
          <h3 className="font-bold mb-2 sm:mb-3 text-forest-900 text-center border-b border-forest-700 pb-2 font-serif text-sm sm:text-base">
            ATRIBUTOS
          </h3>
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {ATTRIBUTE_NAMES.map((a) => (
              <div
                key={a}
                className="bg-parchment-200 rounded-lg border border-forest-600 p-1.5 sm:p-2 text-center shadow-sm"
              >
                <div>
                  <p className="text-xs font-bold text-forest-800">
                    {a.toUpperCase()}{' '}
                  </p>
                  <p className="text-base sm:text-lg font-bold text-forest-900">
                    {formatModifier(character.attributes[a])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-parchment-50 rounded-xl border border-forest-700 p-3 sm:p-4 shadow-lg">
          <h3 className="font-bold mb-2 sm:mb-3 text-forest-900 text-center border-b border-forest-700 pb-2 font-serif text-sm sm:text-base">
            PAQUETE DE AVENTURA
          </h3>
          <div className="grid grid-cols-2 gap-1 sm:gap-2">
            {PACKAGE_NAMES.map((p) => (
              <div
                key={p}
                className="bg-parchment-200 rounded-lg border border-forest-600 p-1.5 sm:p-2 text-center shadow-sm"
              >
                <div className="text-xs font-bold text-forest-800 ">
                  {p.toUpperCase()}
                </div>
                <p className="flex flex-row justify-center">
                  <span className="text-sm sm:text-base text-forest-900">
                    {character.current[p] ?? 0}{' '}
                    <span className="text-sm sm:text-base font-bold text-forest-900">
                      / {character.packs[p] ?? '—'}
                    </span>
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-parchment-50 rounded-xl border border-forest-700 p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg">
        <h3 className="font-bold mb-2 sm:mb-3 text-forest-900 text-center border-b border-forest-700 pb-2 font-serif text-sm sm:text-base">
          CARACTERÍSTICAS
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {character.virtues.map((v, i) => (
            <div
              key={v.id}
              className="bg-parchment-200 rounded-lg border border-forest-600 p-2 sm:p-3 shadow-sm"
            >
              <div className="text-xs font-bold text-forest-700 mb-1">
                VIRTUD {i + 1} — {v.type.toUpperCase()}
              </div>
              <div className="text-xs sm:text-sm text-forest-900">
                {v.text || '—'}
              </div>
            </div>
          ))}
          <div className="bg-parchment-200 rounded-lg border border-forest-600 p-2 sm:p-3 shadow-sm">
            <div className="text-xs font-bold text-forest-700 mb-1">
              COMPLICACIÓN
            </div>
            <div className="text-xs sm:text-sm text-forest-900">
              {character.complication.text || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
