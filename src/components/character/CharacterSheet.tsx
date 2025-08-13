import {
  ATTRIBUTE_NAMES,
  PACKAGE_NAMES,
  ATTRIBUTE_LABELS,
  PACKAGE_LABELS,
} from '../../types/Character';
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
  isPreview?: boolean;
}

export function CharacterSheet({
  character,
  isPreview = false,
}: CharacterSheetProps) {
  const attributeIcons = {
    vigor: FireIcon,
    agility: BoltIcon,
    wit: EyeIcon,
    intuition: LightBulbIcon,
  };

  const packageIcons = {
    endurance: HeartIcon,
    spirit: SparklesIcon,
    resources: ArchiveBoxIcon,
  };

  return (
    <div
      id="sheet"
      className="bg-parchment-100 bg-paper-texture rounded-xl sm:rounded-2xl border-2 border-forest-700 shadow-2xl p-2 sm:p-4 md:p-6 print:shadow-none print:bg-white"
    >
      {/* Character name - only show in preview mode */}
      {isPreview && character.name && (
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-forest-900 font-serif">
            {character.name}
          </h1>
        </div>
      )}

      {/* Main content grid */}
      <div
        className={`grid grid-cols-1 ${
          isPreview ? 'lg:grid-cols-[1fr_1fr]' : 'lg:grid-cols-[2fr_1fr]'
        } gap-2 sm:gap-4 lg:gap-6`}
      >
        {/* Left column - Attributes and Packages */}
        <div className="space-y-6">
          {/* Notes */}
          {character?.notes && (
            <div className="bg-parchment-50 rounded-lg sm:rounded-xl border-2 border-forest-700 p-2 sm:p-4">
              <div className="text-xs text-forest-900">
                {character.notes || 'Escribe tus notas aquí...'}
              </div>
            </div>
          )}
          {/* Attributes */}
          <div className="bg-parchment-50 rounded-lg sm:rounded-xl border-2 border-forest-700 p-2 sm:p-4">
            <div className="bg-forest-600 text-parchment-100 px-2 sm:px-3 py-1 rounded-lg mb-2 sm:mb-4 text-center">
              <h3 className="font-bold text-xs sm:text-sm font-serif">
                ATRIBUTOS
              </h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-1 sm:gap-2 lg:gap-3">
              {ATTRIBUTE_NAMES.map((attr) => {
                const IconComponent = attributeIcons[attr];
                return (
                  <div
                    key={attr}
                    className="bg-white rounded-md sm:rounded-lg border-2 border-forest-600 p-2 sm:p-2 lg:p-3"
                  >
                    {/* Mobile: Horizontal flex layout */}
                    <div className="flex items-center gap-2 sm:hidden">
                      <div className="w-5 h-5 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-forest-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-forest-800 uppercase leading-tight">
                          {ATTRIBUTE_LABELS[attr]}
                        </div>
                        <div className="text-lg font-bold text-forest-900">
                          {formatModifier(character.attributes[attr])}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Vertical card layout */}
                    <div className="hidden sm:block text-center">
                      <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 justify-center">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-forest-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-forest-700" />
                        </div>
                        <span className="text-xs font-bold text-forest-800 uppercase leading-tight">
                          {ATTRIBUTE_LABELS[attr]}
                        </span>
                      </div>
                      <div className="text-center">
                        <div className="text-lg sm:text-xl lg:text-2xl font-bold text-forest-900">
                          {formatModifier(character.attributes[attr])}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Adventure Package */}
          <div className="bg-parchment-50 rounded-lg sm:rounded-xl border-2 border-forest-700 p-2 sm:p-4">
            <div className="bg-forest-600 text-parchment-100 px-2 sm:px-3 py-1 rounded-lg mb-2 sm:mb-4 text-center">
              <h3 className="font-bold text-xs sm:text-sm font-serif">
                PAQUETE DE AVENTURA
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 lg:gap-3">
              {PACKAGE_NAMES.map((pkg) => {
                const IconComponent = packageIcons[pkg];
                const noMax = pkg === 'resources';
                return (
                  <div
                    key={pkg}
                    className="bg-white rounded-md sm:rounded-lg border-2 border-forest-600 p-2 sm:p-2 lg:p-3"
                  >
                    {/* Mobile: Horizontal flex layout */}
                    <div className="flex items-center gap-2 sm:hidden">
                      <div className="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="w-4 h-4 text-forest-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-forest-800 uppercase leading-tight">
                          {PACKAGE_LABELS[pkg]}
                        </div>
                        <div className="text-xs text-forest-600">
                          ACTUAL:{' '}
                          <span className="font-bold text-forest-900">
                            {character.current[pkg] ?? 0}
                          </span>
                          {!noMax && (
                            <span className="ml-2">
                              MÁXIMO:{' '}
                              <span className="font-bold">
                                {character.packs[pkg] ?? '—'}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Desktop: Vertical card layout */}
                    <div className="hidden sm:block text-center">
                      <div className="flex justify-center mb-1 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-forest-100 rounded-full flex items-center justify-center">
                          <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-forest-700" />
                        </div>
                      </div>
                      <div className="text-xs font-bold text-forest-800 uppercase mb-1 leading-tight">
                        {PACKAGE_LABELS[pkg]}
                      </div>
                      <div className="text-xs text-forest-600 mb-1">ACTUAL</div>
                      <div className="text-lg sm:text-xl font-bold text-forest-900">
                        {character.current[pkg] ?? 0}
                      </div>
                      {!noMax && (
                        <div className="text-xs text-forest-600 mt-1">
                          MÁXIMO: {character.packs[pkg] ?? '—'}
                        </div>
                      )}
                    </div>
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
