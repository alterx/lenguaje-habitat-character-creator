// Step 1: Basic character information

import React from 'react';
import { Section, StepHeader } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import type { Character, CharacterAction } from '../../../types/Character';

interface Step1BasicInfoProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onNext: () => void;
}

export function Step1BasicInfo({
  state,
  dispatch,
  onNext,
}: Step1BasicInfoProps) {
  const isValid = state.name.trim().length > 0;

  return (
    <Section
      title="Datos básicos"
      subtitle="Nombre y notas de tu protagonista."
    >
      <StepHeader step={1} total={5} title="Identidad" />
      <StepNavigation
        step={1}
        canProceed={true}
        onNext={onNext}
        statusMessage="Completá la información básica del personaje."
        isValid={isValid}
      />
      <div className="grid md:grid-cols-[40%_60%] gap-4">
        <div>
          <label className="text-sm font-medium text-green-900">
            Nombre del personaje
          </label>
          <input
            className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 focus:ring-green-600 text-green-900"
            placeholder="Escribí un nombre memorable"
            value={state.name}
            onChange={(e) =>
              dispatch({ type: 'setName', value: e.target.value })
            }
          />
        </div>
        <div>
          <label className="text-sm font-medium text-green-900">Notas</label>
          <textarea
            className="mt-1 min-h-48 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 focus:outline-none focus:ring-2 focus:ring-green-600 text-green-900"
            placeholder="Concepto, origen, motivación…"
            value={state.notes}
            onChange={(e) =>
              dispatch({ type: 'setNotes', value: e.target.value })
            }
          />
        </div>
      </div>
    </Section>
  );
}
