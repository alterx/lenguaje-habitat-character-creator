// Dice roller component for the sidebar

import React, { useState } from 'react';
import { DIFFICULTY_OPTIONS } from '../../constants/gameData';
import { ATTRIBUTE_NAMES } from '../../types/Character';
import { rollD20 } from '../../utils/gameUtils';
import type {
  AttributeName,
  PackageName,
  Character,
  CharacterAction,
} from '../../types/Character';
import { DiceLog } from './DiceLog';

interface DiceRollerProps {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
  lastRoll: string | null;
  onRoll: (result: string) => void;
  onToast: (message: string) => void;
  onClearLog: () => void;
  diceLog: string[];
  onShowModal: (
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) => void;
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
}: DiceRollerProps) {
  const [selectedAttribute, setSelectedAttribute] =
    useState<AttributeName>('Vigor');
  const [selectedDifficulty, setSelectedDifficulty] = useState<number | null>(
    null
  );
  const [useBoost, setUseBoost] = useState(false);
  const [useReRoll, setUseReRoll] = useState(false);

  function handleTest(
    attribute: AttributeName,
    opts: {
      difficulty: number;
      boost?: boolean;
      reroll: boolean;
      spend?: PackageName | null;
    }
  ) {
    const d = rollD20();
    const mod = character.attributes[attribute] ?? 0;
    const boost = opts.boost ? 2 : 0;
    const total = d + mod + boost;
    const outcome = total >= opts.difficulty ? 'ÉXITO' : 'FALLO';

    if (opts.spend) {
      const current = character.current[opts.spend] ?? 0;
      dispatch({
        type: 'setCurrent',
        pack: opts.spend,
        value: Math.max(0, current - (opts.reroll ? 2 : 1)),
      });
    }

    const line = `d20(${d}) ${mod >= 0 ? '+' : '-'} ${Math.abs(mod)}${
      boost ? ' + 2' : ''
    } = ${total} vs ${opts.difficulty} → ${outcome}`;
    onRoll(line);
    onToast(`${outcome}: ${total} vs ${opts.difficulty}`);
    setUseBoost(false);
    setUseReRoll(false);
  }

  return (
    <section className="bg-amber-100 rounded-2xl border border-amber-300 p-4">
      <h3 className="font-semibold mb-2 text-green-900">Ayudante de tiradas</h3>
      {lastRoll && (
        <div className="text-center mb-3 px-3 py-2 border border-amber-300 rounded-xl text-sm bg-amber-50 text-green-900">
          {lastRoll}
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        <select
          className="px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900"
          value={selectedAttribute}
          onChange={(e) =>
            setSelectedAttribute(e.target.value as AttributeName)
          }
        >
          {ATTRIBUTE_NAMES.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <select
          className="px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900"
          value={selectedDifficulty ?? ''}
          onChange={(e) =>
            setSelectedDifficulty(
              e.target.value === '' ? null : Number(e.target.value)
            )
          }
        >
          <option value="">Dificultad</option>
          {DIFFICULTY_OPTIONS.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label} ({d.value})
            </option>
          ))}
        </select>
        <label className="flex items-center gap-2 text-sm col-span-2 text-green-800">
          <input
            type="checkbox"
            checked={useBoost || false}
            onChange={(e) => setUseBoost(!!e.target.checked)}
          />
          <p>
            +2 en la tirada al gastar 1 punto de{' '}
            {selectedAttribute === 'Vigor' ||
            selectedAttribute === 'Agilidad' ? (
              <b>Aguante</b>
            ) : (
              <b>Espíritu</b>
            )}
          </p>
        </label>
        <label className="flex items-center gap-2 text-sm col-span-2 text-green-800">
          <input
            type="checkbox"
            checked={useReRoll || false}
            onChange={(e) => setUseReRoll(!!e.target.checked)}
          />
          <p>
            -2 puntos de <b>Espíritu</b> para repetir tirada
          </p>
        </label>
        <button
          className="col-span-2 px-3 py-2 rounded-xl bg-green-800 text-white hover:bg-green-700"
          onClick={() => {
            if (selectedDifficulty === null) {
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
                selectedAttribute === 'Vigor' ||
                selectedAttribute === 'Agilidad'
              ) {
                spend = 'Aguante';
              } else if (
                selectedAttribute === 'Ingenio' ||
                selectedAttribute === 'Intuición'
              ) {
                spend = 'Espíritu';
              }

              // Check if we have enough points to spend
              if (spend && (character.current[spend] ?? 0) <= 0) {
                onShowModal(`No tenés puntos de ${spend} para gastar.`, {
                  title: 'Puntos insuficientes',
                  type: 'warning',
                });
                return;
              }
            }

            if (useReRoll) {
              spend = 'Espíritu';
              // Check if we have enough points to spend
              if (spend && (character.current[spend] ?? 0) <= 0) {
                onShowModal(`No tenés puntos de ${spend} para gastar.`, {
                  title: 'Puntos insuficientes',
                  type: 'warning',
                });
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
        >
          Tirar d20
        </button>
      </div>

      <DiceLog log={diceLog} onClear={onClearLog} />
    </section>
  );
}
