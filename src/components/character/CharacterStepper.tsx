interface CharacterStepperProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function CharacterStepper({
  currentStep,
  totalSteps,
  onStepClick,
}: CharacterStepperProps) {
  return (
    <nav className="mb-4 grid grid-cols-5 gap-2" aria-label="Pasos">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <button
          key={i}
          className={`h-2 rounded-full ${
            i + 1 <= currentStep ? 'bg-green-700' : 'bg-amber-300'
          }`}
          onClick={() => onStepClick(i + 1)}
          aria-label={`Ir al paso ${i + 1}`}
        />
      ))}
    </nav>
  );
}
