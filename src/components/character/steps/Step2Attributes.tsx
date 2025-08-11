// Step 2: Attributes distribution

import React, { useMemo } from 'react';
import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { SetSelector, ValueSelect } from '../../ui/FormComponents';
import { ATTRIBUTE_SETS } from '../../../constants/gameData';
import { ATTRIBUTE_NAMES } from '../../../types/Character';
import { formatModifier, buildCountMap } from '../../../utils/gameUtils';
import type { Character, CharacterAction } from '../../../types/Character';

interface Step2AttributesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
}

export function Step2Attributes({
  state,
  dispatch,
  onBack,
  onNext,
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

  const attrsValid =
    ATTRIBUTE_NAMES.every((a) => state.attributes[a] !== null) &&
    Object.values(state.attributes).filter((v) => v !== null).length === 4;

  return (
    <Section
      title="Atributos"
      subtitle="Elegí un conjunto y distribuí sus modificadores entre Vigor, Agilidad, Ingenio e Intuición."
    >
      <StepHeader step={2} total={5} title="Distribución de Atributos" />
      <StepNavigation
        step={2}
        canProceed={attrsValid}
        onBack={onBack}
        onNext={onNext}
        statusMessage={
          attrsValid
            ? '✔ Atributos completos.'
            : 'Distribuí los cuatro valores respetando los duplicados del set.'
        }
        isValid={attrsValid}
      />

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
          <div key={attr} className="flex items-end gap-3">
            <div className="flex-1">
              <ValueSelect
                label={attr}
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
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
