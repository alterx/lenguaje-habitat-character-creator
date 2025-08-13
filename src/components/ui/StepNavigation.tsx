import { Button } from './Button';

interface StepNavigationProps {
  step: number;
  canProceed: boolean;
  onBack?: () => void;
  onBackLabel?: string;
  onNext?: () => void;
  onNextLabel?: string;
  statusMessage: string;
  isValid: boolean;
}

export function StepNavigation({
  step,
  canProceed,
  onBack,
  onBackLabel = 'Atrás',
  onNext,
  onNextLabel = 'Siguiente',
  statusMessage,
  isValid,
}: StepNavigationProps) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className={`text-sm ${isValid ? 'text-green-800' : 'text-amber-800'}`}>
        {statusMessage}
      </p>
      <div className="flex gap-2 w-full sm:w-auto">
        {onBack && (
          <Button
            onPress={onBack}
            label={onBackLabel}
            className="min-w-[100px] min-h-[44px] flex-1 sm:flex-none"
          />
        )}
        {onNext && (
          <Button
            variant="primary"
            onPress={onNext}
            label={onNextLabel}
            disabled={!canProceed}
            className="min-w-[100px] min-h-[44px] flex-1 sm:flex-none"
          />
        )}
      </div>
    </div>
  );
}
