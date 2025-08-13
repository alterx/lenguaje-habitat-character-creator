import { CharacterStepper } from './CharacterStepper';
import { Step1BasicInfo } from './steps/Step1BasicInfo';
import { Step2Attributes } from './steps/Step2Attributes';
import { Step3Packages } from './steps/Step3Packages';
import { Step4Virtues } from './steps/Step4Virtues';
import { Step5Preview } from './steps/Step5Preview';
import type { Character, CharacterAction } from '../../types/Character';

interface CharacterFormProps {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
  currentStep: number;
  onStepChange: (step: number) => void;
  onShowModal: (
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) => void;
  onDownloadJSON: () => void;
  onShareLink: () => void;
  isPlaying: boolean;
  onStartPlaying: () => void;
  onStopPlaying: () => void;
}

export function CharacterForm({
  character,
  dispatch,
  currentStep,
  onStepChange,
  onShowModal,
  onDownloadJSON,
  onShareLink,
  isPlaying,
  onStartPlaying,
  onStopPlaying,
}: CharacterFormProps) {
  const totalSteps = 5;

  return (
    <>
      {!isPlaying && (
        <CharacterStepper
          currentStep={currentStep}
          totalSteps={totalSteps}
          onStepClick={onStepChange}
        />
      )}

      {currentStep === 1 && (
        <Step1BasicInfo
          state={character}
          dispatch={dispatch}
          onNext={() => onStepChange(2)}
          isPlaying={isPlaying}
        />
      )}

      {currentStep === 2 && (
        <Step2Attributes
          state={character}
          dispatch={dispatch}
          onBack={() => onStepChange(1)}
          onNext={() => onStepChange(3)}
          isPlaying={isPlaying}
        />
      )}

      {currentStep === 3 && (
        <Step3Packages
          state={character}
          dispatch={dispatch}
          onBack={() => onStepChange(2)}
          onNext={() => onStepChange(4)}
          isPlaying={isPlaying}
        />
      )}

      {currentStep === 4 && (
        <Step4Virtues
          state={character}
          dispatch={dispatch}
          onBack={() => onStepChange(3)}
          onNext={() => onStepChange(5)}
          isPlaying={isPlaying}
        />
      )}

      {currentStep === 5 && (
        <Step5Preview
          state={character}
          onBack={() => onStepChange(4)}
          onShowModal={onShowModal}
          onDownloadJSON={onDownloadJSON}
          onShareLink={onShareLink}
          isPlaying={isPlaying}
          onStartPlaying={onStartPlaying}
          onStopPlaying={onStopPlaying}
        />
      )}
    </>
  );
}
