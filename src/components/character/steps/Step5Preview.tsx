// Step 5: Character sheet preview and export

import React, { useState } from 'react';
import { Section, StepHeader } from '../../ui/BasicComponents';
import { CharacterSheet } from '../CharacterSheet';
import { exportWithJsPDF } from '../../../utils/pdfExport';
import type { Character } from '../../../types/Character';
import {
  CloudArrowDownIcon,
  DocumentIcon,
  PencilSquareIcon,
  ShareIcon,
} from '@heroicons/react/24/solid';
import { Button } from '../../ui/Button';
import { StepNavigation } from '../../ui/StepNavigation';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const allValid =
    state.name.trim().length > 0 &&
    Object.values(state.attributes).every((v) => v !== null) &&
    Object.values(state.packs).every((v) => v !== null) &&
    state.virtues.length === 3 &&
    state.virtues.every((v) => v.text.trim().length > 0) &&
    state.complication.text.trim().length > 0;

  const startPlaying = () => {
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <Section
      title={isPlaying ? '' : state?.name}
      subtitle={
        isPlaying
          ? ''
          : 'Tu protagonista está listo para embarcarse en una aventura.'
      }
      step={5}
    >
      {!isPlaying && (
        <>
          <StepNavigation
            step={5}
            canProceed={allValid}
            onBack={onBack}
            onNext={startPlaying}
            onNextLabel="Jugar"
            statusMessage="✔ Creación Completa."
            isValid={allValid}
          />
        </>
      )}
      {isPlaying && (
        <div className="flex flex-row justify-end mb-4">
          <Button
            onPress={stopPlaying}
            icon={<PencilSquareIcon className="h-5 w-5" />}
          />
        </div>
      )}
      <CharacterSheet character={state} />

      <div className="gap-2 flex justify-end pb-8 pt-4">
        {/*
        // disable this for the time being
        <Button
          disabled={!allValid}
          onPress={async () => {
            const result = await exportWithJsPDF(state);
            if (!result.success) {
              onShowModal(result.error || 'Error al exportar PDF', {
                title: 'Error de exportación',
                type: 'error',
              });
            }
          }}
          icon={<DocumentIcon className="h-5 w-5" />}
        /> */}

        <Button
          onPress={onDownloadJSON}
          icon={<CloudArrowDownIcon className="h-5 w-5" />}
        />

        <Button
          onPress={onShareLink}
          icon={<ShareIcon className="h-5 w-5" />}
        />
      </div>
    </Section>
  );
}
