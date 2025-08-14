import { useMemo } from 'react';
import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { SetSelector, ValueSelect } from '../../ui/FormComponents';
import { ATTRIBUTE_SETS } from '../../../constants/gameData';
import { ATTRIBUTE_LABELS, ATTRIBUTE_NAMES } from '../../../types/Character';
import { formatModifier, buildCountMap } from '../../../utils/gameUtils';
import type { Character, CharacterAction } from '../../../types/Character';
import { isStep2Valid } from '../CharacterStepper';

interface Step2AttributesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
  isPlaying: boolean;
}

export function Step2Attributes({
  state,
  dispatch,
  onBack,
  onNext,
  isPlaying,
}: Step2AttributesProps) {
  const attributeSetValues = ATTRIBUTE_SETS[state.attributeSet];
  const allowedAttrCounts = useMemo(
    () => buildCountMap(attributeSetValues),
    [attributeSetValues]
  );
  const assignedAttrCounts = useMemo(() => {
    const vals = Object.values(state.attributes).filter(
      (v): v is number => v !== null
    );
    return buildCountMap(vals);
  }, [state.attributes]);

  const attrsValid = isStep2Valid(state);

  return (
    <Section
      title="Atributos"
      subtitle="Elegí un conjunto y distribuí sus valores entre Vigor, Agilidad, Ingenio e Intuición."
      step={2}
      isPlaying={isPlaying}
    >
      <SetSelector
        label="Conjunto"
        value={state.attributeSet}
        sets={ATTRIBUTE_SETS}
        formatValue={(values) => values.map(formatModifier).join('  ')}
        onChange={(key) => dispatch({ type: 'setAttributeSet', value: key })}
      />

      <Divider />

      <div className="grid md:grid-cols-4 gap-4">
        {ATTRIBUTE_NAMES.map((attr) => (
          <div key={attr} className="space-y-2">
            <ValueSelect
              label={ATTRIBUTE_LABELS[attr]}
              value={state.attributes[attr]}
              options={attributeSetValues}
              allowedCounts={allowedAttrCounts}
              assignedCounts={assignedAttrCounts}
              formatOption={(v) => formatModifier(v)}
              onChange={(value) =>
                dispatch({
                  type: 'setAttribute',
                  attribute: attr,
                  value,
                })
              }
            />
            {attr === 'vigor' && (
              <p className="text-xs text-forest-700 text-center">
                La <strong>potencia y resistencia</strong> de tu protagoinista.
              </p>
            )}
            {attr === 'agility' && (
              <p className="text-xs text-forest-700 text-center">
                La <strong>velocidad y destreza</strong> de tu protagonista.
              </p>
            )}
            {attr === 'wit' && (
              <p className="text-xs text-forest-700 text-center">
                La <strong>inteligencia y estrategia</strong> de tu
                protagonista.
              </p>
            )}
            {attr === 'intuition' && (
              <p className="text-xs text-forest-700 text-center">
                La <strong>observación y el instinto</strong> de tu
                protagonista.
              </p>
            )}
          </div>
        ))}
      </div>
      <StepNavigation
        step={2}
        onBack={onBack}
        onNext={onNext}
        statusMessage={
          attrsValid
            ? '✔ Atributos completos.'
            : 'Distribuí los cuatro valores respetando los duplicados del set.'
        }
        isValid={attrsValid}
      />
    </Section>
  );
}
