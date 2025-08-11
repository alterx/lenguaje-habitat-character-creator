// Welcome screen component

import React from 'react';
import { Character } from '../../types/Character';

interface WelcomeScreenProps {
  onCreateCharacter: () => void;
  characters: Character[];
  selectedId: string;
  onSelectCharacter: (id: string) => void;
  onDeleteCharacter: (id: string) => void;
  onUploadJSON: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function WelcomeScreen({
  onCreateCharacter,
  characters,
  selectedId,
  onSelectCharacter,
  onDeleteCharacter,
  onUploadJSON,
}: WelcomeScreenProps) {
  const isFirstCharacter = characters.length === 0;
  return (
    <div className="text-center py-12">
      <div className="bg-amber-100 rounded-2xl border border-amber-300 p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-semibold text-green-900 mb-4">
          ¡Bienvenido!
        </h2>
        <p className="text-green-800 mb-6">
          Comenzá creando un nuevo personaje
        </p>
        <button
          className="px-9 py-6 rounded-xl bg-green-800 text-white hover:bg-green-700 text-xl font-medium"
          onClick={onCreateCharacter}
        >
          {isFirstCharacter ? 'Crear mi primer personaje!' : 'Vamos a ello'}
        </button>
        <hr className="my-6 border-amber-300" />
        <p className="text-green-800 mb-3 mt-6 font-light text-xs">
          También podés
        </p>
        <label className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-xs cursor-pointer text-green-900">
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
            <p className="text-green-800 mb-3 mt-3 font-light text-xs">
              o seleccionar uno existente
            </p>
            <select
              className="px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 text-green-900 text-xs"
              value={selectedId}
              onChange={(e) => onSelectCharacter(e.target.value)}
            >
              <option value="">Seleccionar personaje...</option>
              {characters.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name || 'Sin nombre'}
                </option>
              ))}
            </select>
            {selectedId && (
              <button
                className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-sm text-green-900"
                onClick={() => onDeleteCharacter(selectedId)}
              >
                Eliminar
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
