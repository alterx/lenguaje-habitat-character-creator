import { ATTRIBUTE_NAMES, PACKAGE_NAMES } from '../../types/Character';
import { formatModifier } from '../../utils/gameUtils';
import type { Character } from '../../types/Character';
import {
  UserIcon,
  BoltIcon,
  FireIcon,
  EyeIcon,
  LightBulbIcon,
  HeartIcon,
  SparklesIcon,
  ArchiveBoxIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

interface CharacterSheetProps {
  character: Character;
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  const attributeIcons = {
    Vigor: FireIcon,
    Agilidad: BoltIcon,
    Ingenio: EyeIcon,
    Intuición: LightBulbIcon,
  };

  const packageIcons = {
    Aguante: HeartIcon,
    Espíritu: SparklesIcon,
    Recursos: ArchiveBoxIcon,
  };

  return (
    <div
      id="sheet"
      className="bg-parchment-100 bg-paper-texture rounded-2xl border-2 border-forest-700 shadow-2xl p-4 sm:p-6 print:shadow-none print:bg-white"
    >
      {/* Header with character name */}
      <div className="mb-6">
        <div className="bg-forest-600 text-parchment-100 px-4 py-2 rounded-t-xl">
          <h1 className="text-lg font-bold text-center font-serif tracking-wide">
            LENGUAJE HÁBITAT
          </h1>
        </div>
        <div className="bg-parchment-50 border-2 border-forest-700 rounded-b-xl p-4">
          <div className="bg-white rounded-lg border border-forest-600 p-3 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-forest-900 font-serif">
              {character.name || 'NOMBRE DEL PERSONAJE'}
            </h2>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* Left column - Attributes and Packages */}
        <div className="space-y-6">
          {/* Notes */}
          {character?.notes && (
            <div className="bg-parchment-50 rounded-xl border-2 border-forest-700 p-4">
              <div className="text-xs text-forest-900">
                {character.notes || 'Escribe tus notas aquí...'}
              </div>
            </div>
          )}
          {/* Attributes */}
          <div className="bg-parchment-50 rounded-xl border-2 border-forest-700 p-4">
            <div className="bg-forest-600 text-parchment-100 px-3 py-1 rounded-lg mb-4 text-center">
              <h3 className="font-bold text-sm font-serif">ATRIBUTOS</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ATTRIBUTE_NAMES.map((attr) => {
                const IconComponent = attributeIcons[attr];
                return (
                  <div
                    key={attr}
                    className="bg-white rounded-lg border-2 border-forest-600 p-3"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-forest-700" />
                      </div>
                      <span className="text-xs font-bold text-forest-800 uppercase">
                        {attr}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs text-forest-600">
                        MODIFICADOR
                      </span>
                      <div className="text-2xl font-bold text-forest-900">
                        {formatModifier(character.attributes[attr])}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Adventure Package */}
          <div className="bg-parchment-50 rounded-xl border-2 border-forest-700 p-4">
            <div className="bg-forest-600 text-parchment-100 px-3 py-1 rounded-lg mb-4 text-center">
              <h3 className="font-bold text-sm font-serif">
                PAQUETE DE AVENTURA
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {PACKAGE_NAMES.map((pkg) => {
                const IconComponent = packageIcons[pkg];
                const noMax = pkg === 'Recursos';
                return (
                  <div
                    key={pkg}
                    className="bg-white rounded-lg border-2 border-forest-600 p-3 text-center"
                  >
                    <div className="flex justify-center mb-2">
                      <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-forest-700" />
                      </div>
                    </div>
                    <div className="text-xs font-bold text-forest-800 uppercase mb-1">
                      {pkg}
                    </div>
                    <div className="text-xs text-forest-600 mb-1">ACTUAL</div>
                    <div className="text-xl font-bold text-forest-900">
                      {character.current[pkg] ?? 0}
                    </div>
                    {!noMax && (
                      <div className="text-xs text-forest-600 mt-1">
                        MÁXIMO: {character.packs[pkg] ?? '—'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right column - Characteristics */}
        <div className="space-y-6">
          {/* Characteristics */}
          <div className="bg-parchment-50 rounded-xl border-2 border-forest-700 p-4">
            <div className="bg-forest-600 text-parchment-100 px-3 py-1 rounded-lg mb-4 text-center">
              <h3 className="font-bold text-sm font-serif">CARACTERÍSTICAS</h3>
            </div>

            <div className="space-y-3">
              {character.virtues.map((virtue, i) => (
                <div
                  key={virtue.id}
                  className="bg-white rounded-lg border-2 border-forest-600 p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                      <StarIcon className="w-5 h-5 text-forest-700" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-forest-700">
                        VIRTUD {i + 1}
                      </div>
                      <div className="text-xs text-forest-600 uppercase">
                        {virtue.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-forest-900 bg-gray-50 rounded p-2 min-h-[60px]">
                    {virtue.text || 'Describe la virtud aquí...'}
                  </div>
                </div>
              ))}

              {/* Complication */}
              <div className="bg-white rounded-lg border-2 border-red-400 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-red-700" />
                  </div>
                  <div className="text-xs font-bold text-red-700">
                    COMPLICACIÓN
                  </div>
                </div>
                <div className="text-xs text-forest-900 bg-red-50 rounded p-2 min-h-[60px]">
                  {character.complication.text ||
                    'Describe la complicación aquí...'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
