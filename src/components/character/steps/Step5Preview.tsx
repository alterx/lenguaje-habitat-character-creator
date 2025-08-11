// Step 5: Character sheet preview and export

import React from 'react';
import { Section, StepHeader } from '../../ui/BasicComponents';
import { CharacterSheet } from '../CharacterSheet';
import { exportWithJsPDF } from '../../../utils/pdfExport';
import type { Character } from '../../../types/Character';

interface Step5PreviewProps {
  state: Character;
  onBack: () => void;
  onShowModal: (
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) => void;
  onShareLink: () => void;
  onDownloadJSON: () => void;
}

export function Step5Preview({
  state,
  onBack,
  onShowModal,
  onShareLink,
  onDownloadJSON,
}: Step5PreviewProps) {
  const allValid =
    state.name.trim().length > 0 &&
    Object.values(state.attributes).every((v) => v !== null) &&
    Object.values(state.packs).every((v) => v !== null) &&
    state.virtues.length === 3 &&
    state.virtues.every((v) => v.text.trim().length > 0) &&
    state.complication.text.trim().length > 0;

  return (
    <Section title={state.name} subtitle="Exportá tu personaje.">
      <StepHeader step={5} total={5} title="" />
      <div className="mb-4 flex items-center justify-between">
        <p
          className={`text-sm ${
            allValid ? 'text-green-800' : 'text-amber-800'
          }`}
        >
          {allValid ? '' : 'Completá todos los pasos para una hoja perfecta.'}
        </p>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 rounded-xl border border-amber-400 bg-amber-200 hover:bg-amber-300 text-green-900"
            onClick={onBack}
          >
            Atrás
          </button>
        </div>
      </div>
      <CharacterSheet character={state} />

      <div className="gap-2 flex justify-evenly pb-8 pt-4">
        <button
          className="px-4 py-2 rounded-xl bg-green-800 text-white hover:bg-green-600 disabled:opacity-50"
          disabled={!allValid}
          onClick={async () => {
            const result = await exportWithJsPDF(state);
            if (!result.success) {
              onShowModal(result.error || 'Error al exportar PDF', {
                title: 'Error de exportación',
                type: 'error',
              });
            }
          }}
        >
          PDF
        </button>
        <button
          className="px-4 py-2 rounded-xl bg-green-800 text-white hover:bg-green-600 disabled:opacity-50"
          onClick={onDownloadJSON}
          disabled={!allValid}
        >
          Descargar
        </button>

        <button
          className="px-4 py-2 rounded-xl bg-green-800 text-white hover:bg-green-600 disabled:opacity-50"
          onClick={onShareLink}
          disabled={!allValid}
        >
          Compartir
        </button>
      </div>
    </Section>
  );
}
