import { useState } from 'react';
import { DIFFICULTY_OPTIONS } from '../../constants/gameData';
import {
  ATTRIBUTE_NAMES,
  ATTRIBUTE_LABELS,
  PACKAGE_LABELS,
} from '../../types/Character';
import { rollD20 } from '../../utils/gameUtils';
import type {
  AttributeName,
  PackageName,
  Character,
  CharacterAction,
} from '../../types/Character';
import { DiceLog } from './DiceLog';
import { Select, createSelectOptions } from '../ui/Select';
import { Button } from '../ui/Button';
import { Log } from '../../types/Game';

interface DiceRollerProps {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
  lastRoll: string | null;
  onRoll: (result: string) => void;
  onToast: (message: string) => void;
  onClearLog: () => void;
  diceLog: Log[];
  onShowModal: (
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) => void;
  mode?: 'player' | 'gm';
}

export function DiceRoller({
  character,
  dispatch,
  lastRoll,
  onRoll,
  onToast,
  onClearLog,
  diceLog,
  onShowModal,
  mode = 'player',
}: DiceRollerProps) {
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeName>('vigor');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null
  );
  const [useBoost, setUseBoost] = useState(false);
  const [useReRoll, setUseReRoll] = useState(false);

  function handleTest(
    attribute: AttributeName,
    opts: {
      difficulty: number | null;
      boost?: boolean;
      reroll: boolean;
      spend?: PackageName | null;
    }
  ) {
    const d = rollD20();
    const mod = character.attributes[attribute] ?? 0;
    const boost = opts.boost ? 2 : 0;
    const total = d + mod + boost;
    const outcome = opts?.difficulty
      ? total >= opts.difficulty
        ? 'ÉXITO'
        : 'FALLO'
      : '';

    if (opts.spend) {
      const current = character.current[opts.spend] ?? 0;
      dispatch({
        type: 'setCurrent',
        pack: opts.spend,
        value: Math.max(0, current - (opts.reroll ? 2 : 1)),
      });
    }

    let line = `d20(${d}) ${mod >= 0 ? '+' : '-'} ${Math.abs(mod)}${
      boost ? ' + 2' : ''
    } = ${total}`;

    if (opts?.difficulty) {
      line += ` vs ${opts.difficulty} → ${outcome}`;
    }
    onRoll(line);
    onToast(
      `${outcome}: ${total} vs ${opts?.difficulty ? opts.difficulty : ''}`
    );
    setUseBoost(false);
    setUseReRoll(false);
  }

  return (
    <section className="bg-parchment-300 bg-paper-texture backdrop-blur-sm rounded-2xl border border-parchment-600 p-4 shadow-lg">
      <h3 className="font-semibold mb-2 text-forest-800 font-serif">
        Ayudante de tiradas
      </h3>
      {lastRoll && (
        <div className="text-center mb-3 px-3 py-2 border border-forest-600 rounded-xl text-sm bg-forest-700 text-parchment-100">
          {lastRoll}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <Select
          value={selectedAttribute}
          onChange={(value) => setSelectedAttribute(value as AttributeName)}
          options={ATTRIBUTE_NAMES.map((attr) => {
            const value = character.attributes[attr] ?? 0;
            return {
              value: attr,
              label: `${ATTRIBUTE_LABELS[attr]} (${
                value >= 0 ? '+' : ''
              }${value})`,
            };
          })}
          variant="form"
          className={mode === 'player' ? 'col-span-2' : ''}
        />
        {mode === 'gm' && (
          <Select
            value={selectedDifficulty?.toString() ?? ''}
            onChange={(value) =>
              setSelectedDifficulty(value === '' ? null : Number(value))
            }
            options={DIFFICULTY_OPTIONS.map((d) => ({
              value: d.value,
              label: `${d.label} (${d.value})`,
            }))}
            placeholder="Dificultad"
            variant="form"
          />
        )}

        <label className="flex items-center gap-2 text-sm col-span-2 text-forest-800">
          <input
            type="checkbox"
            checked={useBoost || false}
            onChange={(e) => setUseBoost(!!e.target.checked)}
          />
          <p>
            +2 en la tirada al gastar 1 punto de{' '}
            {selectedAttribute === 'vigor' ||
            selectedAttribute === 'agility' ? (
              <strong>{PACKAGE_LABELS.endurance}</strong>
            ) : (
              <strong>{PACKAGE_LABELS.spirit}</strong>
            )}
          </p>
        </label>
        <label className="flex items-center gap-2 text-sm col-span-2 text-forest-800">
          <input
            type="checkbox"
            checked={useReRoll || false}
            onChange={(e) => setUseReRoll(!!e.target.checked)}
          />
          <p>
            -2 puntos de <strong>{PACKAGE_LABELS.spirit}</strong> para repetir
            tirada
          </p>
        </label>
        <Button
          variant="primary"
          onPress={() => {
            if (selectedDifficulty === null && mode === 'gm') {
              onShowModal('Seleccioná una dificultad.', {
                title: 'Dificultad requerida',
                type: 'warning',
              });
              return;
            }

            let spend: PackageName | null = null;
            if (useBoost) {
              // Check which package to spend from based on attribute
              if (
                selectedAttribute === 'vigor' ||
                selectedAttribute === 'agility'
              ) {
                spend = 'endurance';
              } else if (
                selectedAttribute === 'wit' ||
                selectedAttribute === 'intuition'
              ) {
                spend = 'spirit';
              }

              // Check if we have enough points to spend
              if (spend && (character.current[spend] ?? 0) <= 0) {
                onShowModal(
                  `No tenés puntos de ${PACKAGE_LABELS[spend]} para gastar.`,
                  {
                    title: 'Puntos insuficientes',
                    type: 'warning',
                  }
                );
                return;
              }
            }

            if (useReRoll) {
              spend = 'spirit';
              // Check if we have enough points to spend
              if (spend && (character.current[spend] ?? 0) <= 0) {
                onShowModal(
                  `No tenés puntos de ${PACKAGE_LABELS[spend]} para gastar.`,
                  {
                    title: 'Puntos insuficientes',
                    type: 'warning',
                  }
                );
                return;
              }
            }

            handleTest(selectedAttribute, {
              difficulty: selectedDifficulty,
              boost: useBoost,
              spend,
              reroll: useReRoll,
            });
          }}
          label="Tirar d20"
          className="col-span-2"
        />
      </div>

      <DiceLog log={diceLog} onClear={onClearLog} />
    </section>
  );
}
