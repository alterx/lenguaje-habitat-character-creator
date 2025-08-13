import { Section, StepHeader } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { TEXT_LIMITS } from '../../../constants/textLimits';
import type { Character, CharacterAction } from '../../../types/Character';

interface Step1BasicInfoProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onNext: () => void;
  isPlaying: boolean;
}

export function Step1BasicInfo({
  state,
  dispatch,
  onNext,
  isPlaying,
}: Step1BasicInfoProps) {
  const isValid = state.name.trim().length > 0;
  const attrsValid = !!state.name;

  return (
    <Section
      title="Datos básicos"
      subtitle="Definí el nombre y notas importantes de tu protagonista."
      step={1}
      isPlaying={isPlaying}
    >
      <StepNavigation
        step={1}
        canProceed={true}
        onNext={onNext}
        statusMessage={
          attrsValid
            ? '✔ Información lista.'
            : 'Completá la información básica del protagonista.'
        }
        isValid={isValid}
      />
      <div className="grid md:grid-cols-[1fr_2fr] gap-4">
        <div>
          <label className="text-sm font-medium text-green-900">
            Nombre del protagonista
          </label>
          <input
            className="mt-1 w-full px-3 py-2 border border-parchment-600 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 focus:ring-green-600 text-green-900"
            placeholder="Escribí un nombre memorable"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'setName', value: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-green-900">Notas</label>
          <div className="relative">
            <textarea
              className="mt-1 min-h-48 w-full px-3 py-2 border border-parchment-600 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 focus:ring-green-600 text-green-900"
              placeholder="Concepto, origen, motivación…"
              maxLength={TEXT_LIMITS.CHARACTER_NOTES}
              value={state.notes}
              onChange={(e) =>
                dispatch({ type: 'setNotes', value: e.target.value })
              }
            />
            <div className="absolute bottom-2 right-2 text-xs text-forest-600">
              {state.notes.length}/{TEXT_LIMITS.CHARACTER_NOTES}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
