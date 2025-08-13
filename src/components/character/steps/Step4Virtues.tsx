import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { VIRTUE_TYPES } from '../../../types/Character';
import { TEXT_LIMITS } from '../../../constants/textLimits';
import type {
  Character,
  CharacterAction,
  VirtueType,
} from '../../../types/Character';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from '../../ui/Button';
import { Select, createSelectOptions } from '../../ui/Select';

interface Step4VirtuesProps {
  state: Character;
  dispatch: React.Dispatch<CharacterAction>;
  onBack: () => void;
  onNext: () => void;
  isPlaying: boolean;
}

export function Step4Virtues({
  state,
  dispatch,
  isPlaying,
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
      subtitle="Definí tres virtudes y una complicación para tu protagonista."
      step={4}
      isPlaying={isPlaying}
    >
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
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-2 items-start"
          >
            <div>
              <label className="text-sm font-medium text-green-900">Tipo</label>
              <div className="mt-1">
                <Select
                  variant="form"
                  value={v.type}
                  onChange={(value) =>
                    dispatch({
                      type: 'setVirtue',
                      id: v.id,
                      patch: { type: value as VirtueType },
                    })
                  }
                  options={createSelectOptions([...VIRTUE_TYPES])}
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-green-900">
                Virtud #{idx + 1}
              </label>
              <div className="relative">
                <textarea
                  className="mt-1 w-full px-3 py-2 border border-parchment-600 rounded-xl bg-amber-50 text-green-900 resize-none"
                  placeholder="Describe un artefacto, rasgo, talento o magia"
                  rows={4}
                  maxLength={TEXT_LIMITS.VIRTUE_TEXT}
                  value={v.text}
                  onChange={(e) =>
                    dispatch({
                      type: 'setVirtue',
                      id: v.id,
                      patch: { text: e.target.value },
                    })
                  }
                />
                <div className="absolute bottom-2 right-2 text-xs text-forest-600">
                  {v.text.length}/{TEXT_LIMITS.VIRTUE_TEXT}
                </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-start md:pt-7">
              <Button
                variant="destructive"
                onPress={() => dispatch({ type: 'removeVirtue', id: v.id })}
                disabled={state.virtues.length <= 1}
                icon={<TrashIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        ))}
        {state.virtues.length < 3 && (
          <div className="flex justify-center">
            <Button
              variant="primary"
              onPress={() => dispatch({ type: 'addVirtue' })}
              icon={<PlusIcon className="h-5 w-5" />}
            />
          </div>
        )}
      </div>
      <Divider />
      <div>
        <label className="text-sm font-medium text-green-900">
          Complicación
        </label>
        <div className="relative">
          <textarea
            className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900 resize-none"
            placeholder="Un aspecto negativo o dramático"
            rows={3}
            maxLength={TEXT_LIMITS.COMPLICATION_TEXT}
            value={state.complication.text}
            onChange={(e) =>
              dispatch({
                type: 'setComplication',
                value: e.target.value,
              })
            }
          />
          <div className="absolute bottom-2 right-2 text-xs text-forest-600">
            {state.complication.text.length}/{TEXT_LIMITS.COMPLICATION_TEXT}
          </div>
        </div>
      </div>
      <Divider />
      {/* Info Box */}
      <div className="bg-amber-50 rounded-xl border-2 border-amber-400 p-4">
        <div className="bg-amber-500 text-white px-3 py-1 rounded-lg mb-3 text-center">
          <h4 className="font-bold text-xs font-serif">
            ESCRIBÍ TUS CARACTERÍSTICAS
          </h4>
        </div>
        <div className="text-xs text-amber-900 space-y-2">
          <p>
            Las <strong>características</strong> funcionan como "permisos
            narrativos". No cambian el número en el dado, pero cambian la
            situación en la que tirás el dado. Por ejemplo:
          </p>
          <ul className="list-disc pl-5">
            <li className="mb-2">
              <strong>Evitar una tirada:</strong> Si tienes la virtud "El mejor
              cerrajero del reino" y te enfrentás a una cerradura común, la guía
              podría decidir que no necesitás hacer una tirada. Simplemente
              tenés éxito automáticamente.
            </li>
            <li className="mb-2">
              <strong>Reducir la dificultad:</strong> Si te enfrentás a una
              cerradura legendaria, tu misma virtud podría convencer a la guía
              de que la dificultad no es "Milagro" (22), sino "Épico" (18),
              haciendo el éxito mucho más probable.
            </li>
            <li className="mb-2">
              <strong>Permitir lo imposible:</strong> Una característica como
              "Magia de Fuego" te permite intentar acciones que otros personajes
              ni siquiera podrían considerar, como crear una barrera de llamas.
              La tirada será para ver qué tan bien lo hacés, pero el simple
              hecho de poder intentarlo se debe a tu característica.
            </li>
          </ul>
          <p>Podés encontrar distintos tipos:</p>
          <ul className="list-disc pl-5">
            <li className="mb-2">
              <strong>Artefactos:</strong> Un libro, una vara mágica, una caja
              de pociones, un objeto poderoso y único en el mundo.
            </li>
            <li className="mb-2">
              <strong>Rasgos:</strong> Habilidad sobrenatural como controlar
              fuego, magia de plantas, hacer ilusiones o hacer algo.
            </li>
            <li className="mb-2">
              <strong>Talentos:</strong> Conocimiento o capacidad en la cual sos
              prodigio y hasta un poco increíble.
            </li>
            <li className="mb-2">
              <strong>Complicación:</strong> Un aspecto negativo o dramático que
              hace la aventura más difícil, pero también más interesante.
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}
