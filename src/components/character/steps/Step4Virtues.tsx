import { Section, StepHeader, Divider } from '../../ui/BasicComponents';
import { StepNavigation } from '../../ui/StepNavigation';
import { VIRTUE_TYPES } from '../../../types/Character';
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
              <textarea
                className="mt-1 w-full px-3 py-2 border border-parchment-600 rounded-xl bg-amber-50 text-green-900 resize-none"
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
      <Divider />
      <p className="text-xs text-forest-700 text-left">
        Las características funcionan como "permisos narrativos". No cambian el
        número en el dado, pero cambian la situación en la que tiras el dado.
        Esto puede ser mucho más influyente:
      </p>
      <br />
      <ul className="list-disc list-inside text-xs text-forest-700 text-left">
        <li className="mb-2">
          <b>Evitar una tirada:</b> Si tienes la virtud "El mejor cerrajero del
          reino" y te enfrentas a una cerradura común, la guía podría decidir
          que no necesitas hacer una tirada. Simplemente tienes éxito
          automáticamente.
        </li>
        <li className="mb-2">
          <b>Reducir la dificultad:</b> Si te enfrentas a una cerradura
          legendaria, tu misma virtud podría convencer a la guía de que la
          dificultad no es "Milagro" (22), sino "Épico" (18), haciendo el éxito
          mucho más probable.
        </li>
        <li className="mb-2">
          <b>Permitir lo imposible:</b> Una característica como "Magia de Fuego"
          te permite intentar acciones que otros personajes ni siquiera podrían
          considerar, como crear una barrera de llamas. La tirada será para ver
          qué tan bien lo haces, pero el simple hecho de poder intentarlo se
          debe a tu característica.
        </li>
      </ul>
    </Section>
  );
}
