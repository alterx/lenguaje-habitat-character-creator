// Step navigation component

import React from 'react';

interface StepNavigationProps {
  step: number;
  canProceed: boolean;
  onBack?: () => void;
  onNext?: () => void;
  statusMessage: string;
  isValid: boolean;
}

export function StepNavigation({
  step,
  canProceed,
  onBack,
  onNext,
  statusMessage,
  isValid,
}: StepNavigationProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <p className={`text-sm ${isValid ? 'text-green-800' : 'text-amber-800'}`}>
        {statusMessage}
      </p>
      <div className="flex gap-2">
        {onBack && (
          <button
            className="px-4 py-2 rounded-xl border border-amber-400 bg-amber-200 hover:bg-amber-300 text-green-900"
            onClick={onBack}
          >
            Atrás
          </button>
        )}
        {onNext && (
          <button
            className="px-4 py-2 rounded-xl bg-green-800 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!canProceed}
            onClick={onNext}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}
