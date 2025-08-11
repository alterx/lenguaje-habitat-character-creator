// Character sheet component for display and printing

import React from 'react';
import { ATTRIBUTE_NAMES, PACKAGE_NAMES } from '../../types/Character';
import { formatModifier } from '../../utils/gameUtils';
import type { Character } from '../../types/Character';

interface CharacterSheetProps {
  character: Character;
}

export function CharacterSheet({ character }: CharacterSheetProps) {
  return (
    <div
      id="sheet"
      className="bg-amber-50 rounded-2xl border-2 border-green-800 shadow-sm p-6 print:shadow-none"
    >
      <div className="flex items-start justify-between gap-6 flex-wrap mb-6">
        <div className="flex-1 min-w-[260px]">
          <div className="bg-white rounded-xl border border-green-800 p-4 mb-4">
            <h2 className="text-2xl font-bold tracking-tight mb-1 text-green-900 text-center">
              {character.name || 'NOMBRE DEL PERSONAJE'}
            </h2>
          </div>
          <div className="bg-white rounded-xl border border-green-800 p-3">
            <p className="text-sm text-green-800 font-medium">
              {character.notes || '—'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-green-800 p-4">
          <h3 className="font-bold mb-3 text-green-900 text-center border-b border-green-800 pb-2">
            ATRIBUTOS
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ATTRIBUTE_NAMES.map((a) => (
              <div
                key={a}
                className="bg-amber-50 rounded-lg border border-green-700 p-2 text-center"
              >
                <div>
                  <p className="text-xs font-bold text-green-900">
                    {a.toUpperCase()}{' '}
                  </p>
                  <p className="text-l font-bold text-green-900">
                    {formatModifier(character.attributes[a])}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-green-800 p-4">
          <h3 className="font-bold mb-3 text-green-900 text-center border-b border-green-800 pb-2">
            PAQUETE DE AVENTURA
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PACKAGE_NAMES.map((p) => (
              <div
                key={p}
                className="bg-amber-50 rounded-lg border border-green-700 p-2 text-center"
              >
                <div className="text-xs font-bold text-green-900 ">
                  {p.toUpperCase()}
                </div>
                <p className="flex flex-row justify-center">
                  <span className="text-l text-green-900">
                    {character.current[p] ?? 0}{' '}
                    <span className="text-l font-bold text-green-900">
                      / {character.packs[p] ?? '—'}
                    </span>
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-green-800 p-4 mb-6">
        <h3 className="font-bold mb-3 text-green-900 text-center border-b border-green-800 pb-2">
          CARACTERÍSTICAS
        </h3>
        <div className="space-y-3">
          {character.virtues.map((v, i) => (
            <div
              key={v.id}
              className="bg-amber-50 rounded-lg border border-green-700 p-3"
            >
              <div className="text-xs font-bold text-green-800 mb-1">
                VIRTUD {i + 1} — {v.type.toUpperCase()}
              </div>
              <div className="text-sm text-green-900">{v.text || '—'}</div>
            </div>
          ))}
          <div className="bg-amber-50 rounded-lg border border-green-700 p-3">
            <div className="text-xs font-bold text-green-800 mb-1">
              COMPLICACIÓN
            </div>
            <div className="text-sm text-green-900">
              {character.complication.text || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
