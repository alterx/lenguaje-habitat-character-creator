import { useMemo } from 'react';
import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { SetSelector, ValueSelect } from '../../ui/FormComponents';
import { PACKAGE_SETS } from '../../../constants/gameData';
import { PACKAGE_NAMES } from '../../../types/Character';
import { buildCountMap } from '../../../utils/gameUtils';
import type { Character, CharacterAction } from '../../../types/Character';

interface Step3PackagesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
}

export function Step3Packages({
  state,
  dispatch,
  onBack,
  onNext,
}: Step3PackagesProps) {
  const packageSetValues = PACKAGE_SETS[state.packageSet];
  const allowedPackCounts = useMemo(
    () => buildCountMap(packageSetValues),
    [packageSetValues]
  );
  const assignedPackCounts = useMemo(() => {
    const vals = Object.values(state.packs).filter(
      (v): v is number => v !== null
    );
    return buildCountMap(vals);
  }, [state.packs]);

  const packValid =
    PACKAGE_NAMES.every((p) => state.packs[p] !== null) &&
    Object.values(state.packs).filter((v) => v !== null).length === 3;

  return (
    <Section
      title="Paquete de Aventura"
      subtitle="Elegí un conjunto y distribuí los valores entre Aguante, Espíritu y Recursos."
      step={3}
    >
      <StepNavigation
        step={3}
        canProceed={packValid}
        onBack={onBack}
        onNext={onNext}
        statusMessage={
          packValid
            ? '✔ Paquete completo.'
            : 'Distribuí los tres valores respetando duplicados.'
        }
        isValid={packValid}
      />

      <SetSelector
        label="Conjunto"
        value={state.packageSet}
        sets={PACKAGE_SETS}
        formatValue={(values) => values.join('  ')}
        onChange={(key) => dispatch({ type: 'setPackageSet', value: key })}
      />

      <Divider />

      <div className="grid md:grid-cols-3 gap-4">
        {PACKAGE_NAMES.map((pack) => (
          <div key={pack} className="space-y-2">
            <ValueSelect
              label={pack}
              value={state.packs[pack]}
              options={packageSetValues}
              allowedCounts={allowedPackCounts}
              assignedCounts={assignedPackCounts}
              formatOption={(v) => String(v)}
              onChange={(value) => dispatch({ type: 'setPack', pack, value })}
            />
            {pack === 'Aguante' && (
              <p className="text-xs text-forest-700 text-center">
                Se reduce por daño, cansancio o esfuerzo. Si llega a 0, quedás
                inconsciente. Gastá 1 para +2 en <strong>Vigor</strong> o{' '}
                <strong>Agilidad</strong>.
              </p>
            )}
            {pack === 'Espíritu' && (
              <p className="text-xs text-forest-700 text-center">
                Se reduce por consecuencias emocionales, mentales y mágicas. Si
                llega a 0, todos los obstáculos son más difíciles. Gastá 1 para
                +2 en <strong>Ingenio</strong> o <strong>Intuición</strong>; o 2
                para <strong>repetir</strong> un dado.
              </p>
            )}
            {pack === 'Recursos' && (
              <p className="text-xs text-forest-700 text-center">
                Representan conexiones y dinero. Gastá puntos para compras,
                favores u objetos convenientes.
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
