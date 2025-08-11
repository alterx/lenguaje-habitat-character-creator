// Main App component - refactored and modular

import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Header } from './components/layout/Header';
import { WelcomeScreen } from './components/character/WelcomeScreen';
import { CharacterForm } from './components/character/CharacterForm';
import { Sidebar } from './components/sidebar/Sidebar';
import { Toast, Modal } from './components/ui';
import { characterReducer } from './reducers/characterReducer';
import { useAutoSave } from './hooks/useAutoSave';
import { useDiceLog } from './hooks/useDiceLog';
import { createEmptyCharacter } from './constants/defaultCharacter';
import {
  loadCharactersFromLocal,
  loadSelectedIdFromLocal,
} from './utils/localStorage';
import { download, encodeShare, decodeShare } from './utils/gameUtils';
import type { Character } from './types/Character';

export default function App() {
  // Multi-character state
  const [characters, setCharacters] = useState<Character[]>(() => {
    const chars = loadCharactersFromLocal();
    if (chars.length === 0) {
      // First visit: create a new character but don't auto-select
      return [];
    }
    return chars;
  });

  const [selectedId, setSelectedId] = useState<string>(() => {
    const chars = loadCharactersFromLocal();
    const sel = loadSelectedIdFromLocal();
    if (chars.length === 0) {
      return '';
    }
    return sel || '';
  });

  useAutoSave(characters, selectedId);

  // Find selected character
  const selectedChar = useMemo(
    () => characters.find((c) => c.id === selectedId) ?? null,
    [characters, selectedId]
  );

  // Editing logic (reducer for selected character)
  const [state, dispatch] = useReducer(
    characterReducer,
    selectedChar || createEmptyCharacter()
  );

  useEffect(() => {
    if (selectedChar) {
      dispatch({ type: 'load', value: selectedChar });
    }
  }, [selectedChar]);

  // Save character edits
  useEffect(() => {
    if (selectedChar) {
      setCharacters((chars) =>
        chars.map((c) => (c.id === state.id ? state : c))
      );
    }
  }, [state, selectedChar]);

  // Character management
  function addCharacter() {
    setStep(1);
    const newChar = createEmptyCharacter();
    setCharacters((chars) => [...chars, newChar]);
    setSelectedId(newChar.id);
  }

  function deleteCharacter(id: string) {
    const characterToDelete = characters.find((c) => c.id === id);
    const characterName = characterToDelete?.name || 'Sin nombre';

    showModal(
      `¿Estás seguro de que querés eliminar el personaje "${characterName}"? Esta acción no se puede deshacer.`,
      {
        title: 'Confirmar eliminación',
        type: 'confirm',
        onConfirm: () => {
          setCharacters((chars) => chars.filter((c) => c.id !== id));
          if (selectedId === id) {
            const remaining = characters.filter((c) => c.id !== id);
            setSelectedId(remaining[0]?.id ?? '');
          }
        },
      }
    );
  }

  function selectCharacter(id: string) {
    setSelectedId(id);
  }

  // Step management
  const [step, setStep] = useState(1);

  // Dice and toast management
  const dice = useDiceLog();
  const [lastRoll, setLastRoll] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Modal state
  const [modal, setModal] = useState<{
    isOpen: boolean;
    title?: string;
    message: string;
    type?: 'info' | 'error' | 'warning' | 'confirm';
    onConfirm?: () => void;
  }>({
    isOpen: false,
    message: '',
  });

  // Load from URL hash if present
  useEffect(() => {
    const hash = location.hash.replace(/^#/, '');
    if (hash) {
      const loaded = decodeShare(hash);
      if (loaded) dispatch({ type: 'load', value: loaded });
    }
  }, []);

  function onShareLink() {
    const encoded = encodeShare(state);
    const url = `${location.origin}${location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url);
    showModal('Enlace copiado al portapapeles.', {
      title: 'Enlace compartido',
      type: 'info',
    });
  }

  function onDownloadJSON() {
    download(
      `${state.name || 'personaje'}.json`,
      JSON.stringify(state, null, 2)
    );
  }

  function onUploadJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        dispatch({ type: 'load', value: data });
      } catch {
        showModal('Archivo inválido', {
          title: 'Error al cargar archivo',
          type: 'error',
        });
      }
    };
    reader.readAsText(file);
    e.currentTarget.value = '';
  }

  function pushToast(msg: string) {
    setToast(msg);
    setShowToast(true);
    window.clearTimeout((pushToast as any)._t);
    (pushToast as any)._t = window.setTimeout(() => setShowToast(false), 2500);
  }

  function showModal(
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) {
    setModal({
      isOpen: true,
      message,
      ...options,
    });
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, isOpen: false }));
  }

  function handleRoll(result: string) {
    dice.add(result);
    setLastRoll(result);
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Print styles */}
      <style>{`@media print { #app-controls, #helper-panel { display: none !important; } #sheet { box-shadow: none !important; border: none !important; } body { background: white !important; } }`}</style>

      <Header
        characters={characters}
        selectedId={selectedId}
        addCharacter={addCharacter}
        deleteCharacter={deleteCharacter}
        selectCharacter={selectCharacter}
        onDownloadJSON={onDownloadJSON}
        onUploadJSON={onUploadJSON}
        onShareLink={onShareLink}
        selectedChar={selectedChar}
      />

      <main
        className={`max-w-5xl mx-auto px-4 py-6 ${
          selectedChar ? 'grid md:grid-cols-[1fr_320px] gap-6' : ''
        }`}
      >
        <div>
          {!selectedChar ? (
            <WelcomeScreen
              onCreateCharacter={addCharacter}
              onSelectCharacter={selectCharacter}
              characters={characters}
              selectedId={selectedId}
              onDeleteCharacter={deleteCharacter}
              onUploadJSON={onUploadJSON}
            />
          ) : (
            <>
              <h1 className="text-4xl text-green-700 pb-8 font-bold">
                Creador de Personajes
              </h1>

              {selectedChar && (
                <div className="gap-4 flex justify-between pb-8">
                  {selectedId && (
                    <button
                      className="px-3 py-1.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-sm text-green-900"
                      onClick={() => deleteCharacter(selectedId)}
                    >
                      Eliminar
                    </button>
                  )}
                </div>
              )}

              {selectedChar && (
                <CharacterForm
                  character={state}
                  dispatch={dispatch}
                  currentStep={step}
                  onStepChange={setStep}
                  onShowModal={showModal}
                  onDownloadJSON={onDownloadJSON}
                  onShareLink={onShareLink}
                />
              )}
            </>
          )}
        </div>

        {/* Helper Panel - Only show when user has interacted */}
        {selectedChar && (
          <Sidebar
            character={state}
            dispatch={dispatch}
            diceLog={dice.log}
            lastRoll={lastRoll}
            onRoll={handleRoll}
            onClearLog={dice.clear}
            onToast={pushToast}
            onShowModal={showModal}
          />
        )}
      </main>

      <Toast message={toast} isVisible={showToast} />

      <Modal
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onConfirm={modal.onConfirm}
      />

      <footer className="max-w-5xl mx-auto px-4 pb-10 text-center text-xs text-green-600">
        Hecho con ♥ para jugar aventuras. — Guardado automático en tu navegador.
      </footer>
    </div>
  );
}
