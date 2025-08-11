// Step 4: Virtues and complications

import React from 'react';
import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { VIRTUE_TYPES } from '../../../types/Character';
import type {
  Character,
  CharacterAction,
  VirtueType,
} from '../../../types/Character';

interface Step4VirtuesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
}

export function Step4Virtues({
  state,
  dispatch,
  onBack,
  onNext,
}: Step4VirtuesProps) {
  const virtuesValid =
    state.virtues.length === 3 &&
    state.virtues.every((v) => v.text.trim().length > 0);
  const complicationValid = state.complication.text.trim().length > 0;

  return (
    <Section
      title="Características"
      subtitle="Definí tres virtudes y una complicación."
    >
      <StepHeader step={4} total={5} title="Virtudes y Complicación" />
      <StepNavigation
        step={4}
        canProceed={virtuesValid && complicationValid}
        onBack={onBack}
        onNext={onNext}
        statusMessage={
          virtuesValid && complicationValid
            ? '✔ Características listas.'
            : 'Necesitás 3 virtudes y 1 complicación.'
        }
        isValid={virtuesValid && complicationValid}
      />
      <div className="space-y-4">
        {state.virtues.map((v, idx) => (
          <div
            key={v.id}
            className="grid md:grid-cols-[160px_1fr_40px] gap-2 items-start"
          >
            <div>
              <label className="text-sm font-medium text-green-900">Tipo</label>
              <select
                className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900"
                value={v.type}
                onChange={(e) =>
                  dispatch({
                    type: 'setVirtue',
                    id: v.id,
                    patch: { type: e.target.value as VirtueType },
                  })
                }
              >
                {VIRTUE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-green-900">
                Virtud #{idx + 1}
              </label>
              <textarea
                className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900 resize-none"
                placeholder="Describe un artefacto, rasgo, talento o magia"
                rows={3}
                value={v.text}
                onChange={(e) =>
                  dispatch({
                    type: 'setVirtue',
                    id: v.id,
                    patch: { text: e.target.value },
                  })
                }
              />
            </div>
            <div className="pt-7">
              <button
                className="px-3 py-2 rounded-xl border border-amber-400 bg-amber-200 hover:bg-amber-300 disabled:opacity-50 text-green-900"
                disabled={state.virtues.length <= 1}
                onClick={() => dispatch({ type: 'removeVirtue', id: v.id })}
              >
                —
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="px-3 py-2 rounded-xl border border-amber-400 bg-amber-200 hover:bg-amber-300 disabled:opacity-50 text-green-900"
            disabled={state.virtues.length >= 3}
            onClick={() => dispatch({ type: 'addVirtue' })}
          >
            + Agregar virtud
          </button>
        </div>
      </div>
      <Divider />
      <div>
        <label className="text-sm font-medium text-green-900">
          Complicación
        </label>
        <textarea
          className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900 resize-none"
          placeholder="Un aspecto negativo o dramático"
          rows={3}
          value={state.complication.text}
          onChange={(e) =>
            dispatch({
              type: 'setComplication',
              value: e.target.value,
            })
          }
        />
      </div>
    </Section>
  );
}
