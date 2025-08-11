// Header component with logo and character management controls

import React from 'react';
import type { Character } from '../../types/Character';

interface HeaderProps {
  characters: Character[];
  selectedId: string;
  onDownloadJSON: () => void;
  onUploadJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onShareLink: () => void;
  selectedChar: Character | null;
  addCharacter: () => void;
  deleteCharacter: (id: string) => void;
  selectCharacter: (id: string) => void;
}

export function Header({
  characters,
  selectedId,
  addCharacter,
  deleteCharacter,
  selectCharacter,
  selectedChar,
  onUploadJSON,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur bg-white border-b border-amber-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="../myn.png"
            alt="Logo"
            style={{
              height: '80px',
              width: 'auto',
              margin: '20px',
            }}
          />
        </div>
        {selectedChar && (
          <div
            className="flex items-center gap-2 grid-cols-3"
            id="app-controls"
          >
            <button
              className="px-3 py-1.5 rounded-xl bg-green-800 text-white hover:bg-green-700 text-sm"
              onClick={addCharacter}
            >
              Nuevo personaje
            </button>{' '}
            |
            <label className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-sm cursor-pointer text-green-900">
              Cargar Personaje
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={onUploadJSON}
              />
            </label>
            {characters.length > 0 && (
              <>
                |<p className="text-sm text-green-900">Personaje existente: </p>
                <select
                  className="px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 text-green-900"
                  value={selectedId}
                  onChange={(e) => selectCharacter(e.target.value)}
                >
                  <option value="">Seleccionar personaje...</option>
                  {characters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name || 'Sin nombre'}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
