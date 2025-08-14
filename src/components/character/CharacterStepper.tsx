import type { Character } from '../../types/Character';

interface CharacterStepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  character: Character;
}

// Validation functions for each step
export function isStep1Valid(character: Character): boolean {
  return character.name.trim().length > 0;
}

export function isStep2Valid(character: Character): boolean {
  return Object.values(character.attributes).every((v) => v !== null);
}

export function isStep3Valid(character: Character): boolean {
  return Object.values(character.packs).every((v) => v !== null);
}

export function isStep4Valid(character: Character): boolean {
  return (
    character.virtues.length === 3 &&
    character.virtues.every((v) => v.text.trim().length > 0) &&
    character.complication.text.trim().length > 0
  );
}

export function getMaxAccessibleStep(character: Character): number {
  if (!isStep1Valid(character)) return 1;
  if (!isStep2Valid(character)) return 2;
  if (!isStep3Valid(character)) return 3;
  if (!isStep4Valid(character)) return 4;
  return 5; // All steps accessible
}

export function CharacterStepper({
  currentStep,
  totalSteps,
  onStepClick,
  character,
}: CharacterStepperProps) {
  const maxAccessibleStep = getMaxAccessibleStep(character);

  return (
    <nav className="mb-4 grid grid-cols-5 gap-2" aria-label="Pasos">
      {Array.from({ length: totalSteps }).map((_, i) => {
        const stepNumber = i + 1;
        const isAccessible = stepNumber <= maxAccessibleStep;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <button
            key={i}
            className={`h-2 rounded-full transition-colors ${
              isCompleted
                ? 'bg-green-700'
                : isCurrent
                ? 'bg-green-500'
                : isAccessible
                ? 'bg-amber-300 hover:bg-amber-400'
                : 'bg-gray-300 cursor-not-allowed opacity-50'
            }`}
            onClick={() => isAccessible && onStepClick(stepNumber)}
            disabled={!isAccessible}
            aria-label={`${
              isAccessible ? 'Ir al' : 'Paso no disponible'
            } paso ${stepNumber}`}
          />
        );
      })}
    </nav>
  );
}
