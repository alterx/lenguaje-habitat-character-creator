import { useMemo } from 'react';
import { Section, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { SetSelector } from '../../ui/FormComponents';
import { PACKAGE_SETS } from '../../../constants/gameData';
import { PACKAGE_LABELS, PACKAGE_NAMES } from '../../../types/Character';
import type { Character, CharacterAction } from '../../../types/Character';
import { isStep3Valid } from '../CharacterStepper';

interface Step3PackagesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
  isPlaying: boolean;
}

export function Step3Packages({
  state,
  dispatch,
  onBack,
  onNext,
  isPlaying,
}: Step3PackagesProps) {
  const packageSetValues = PACKAGE_SETS[state.packageSet];

  // Filter out empty key for display
  const availableSets = useMemo(() => {
    const filtered: Record<string, number[]> = {};
    Object.entries(PACKAGE_SETS).forEach(([key, value]) => {
      if (key !== '') {
        filtered[key] = value;
      }
    });
    return filtered;
  }, []);

  const packValid = isStep3Valid(state);

  return (
    <Section
      title="Paquete de Aventura"
      subtitle="Elegí un conjunto. Los valores se aplicarán automáticamente a Aguante, Espíritu y Recursos en orden."
      step={3}
      isPlaying={isPlaying}
    >
      <SetSelector
        label="Conjunto"
        value={state.packageSet}
        sets={availableSets}
        formatValue={(values) => values.join('  ')}
        onChange={(key) => {
          const newPackageValues = PACKAGE_SETS[key];
          dispatch({ type: 'setPackageSet', value: key });
          dispatch({
            type: 'setPack',
            pack: 'endurance',
            value: newPackageValues[0],
          });
          dispatch({
            type: 'setPack',
            pack: 'spirit',
            value: newPackageValues[1],
          });
          dispatch({
            type: 'setPack',
            pack: 'resources',
            value: newPackageValues[2],
          });
        }}
      />

      <Divider />

      <div className="grid md:grid-cols-3 gap-4">
        {PACKAGE_NAMES.map((pack, index) => (
          <div key={pack} className="space-y-2">
            <div className="bg-white rounded-lg border-2 border-forest-600 p-3">
              <h3 className="text-sm font-bold text-forest-800 uppercase text-center mb-2">
                {PACKAGE_LABELS[pack]}
              </h3>
              <div className="text-center">
                <div className="text-2xl font-bold text-forest-900">
                  {packageSetValues.length > 0 ? packageSetValues[index] : '—'}
                </div>
              </div>
            </div>
            {pack === 'endurance' && (
              <p className="text-xs text-forest-700 text-center">
                Se reduce por daño, cansancio o esfuerzo. Si llega a 0, quedás
                inconsciente. Gastá 1 para +2 en <strong>Vigor</strong> o{' '}
                <strong>Agilidad</strong>.
              </p>
            )}
            {pack === 'spirit' && (
              <p className="text-xs text-forest-700 text-center">
                Se reduce por consecuencias emocionales, mentales y mágicas. Si
                llega a 0, todos los obstáculos son más difíciles. Gastá 1 para
                +2 en <strong>Ingenio</strong> o <strong>Intuición</strong>; o 2
                para <strong>repetir</strong> un dado.
              </p>
            )}
            {pack === 'resources' && (
              <p className="text-xs text-forest-700 text-center">
                Representan conexiones y dinero. Gastá puntos para compras,
                favores u objetos convenientes.
              </p>
            )}
          </div>
        ))}
      </div>
      <StepNavigation
        step={3}
        onBack={onBack}
        onNext={onNext}
        statusMessage={
          packValid
            ? '✔ Paquete completo.'
            : 'Seleccioná un conjunto de paquetes.'
        }
        isValid={packValid}
      />
    </Section>
  );
}
