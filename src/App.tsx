import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Header } from './components/layout/Header';
import { WelcomeScreen } from './components/character/WelcomeScreen';
import { CharacterForm } from './components/character/CharacterForm';
import { Sidebar } from './components/sidebar/Sidebar';
import { Modal } from './components/ui/Modal';
import { Toast } from './components/ui/Toast';
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
import {
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/solid';

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

  // Mobile form collapse state
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);

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
      if (loaded) {
        // Just load the character data for preview, don't add to characters list
        dispatch({ type: 'load', value: loaded });
        // Clear the hash from URL
        window.history.replaceState(
          {},
          document.title,
          window.location.pathname + window.location.search
        );
      }
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

        // Ensure the loaded character has a unique ID
        const characterWithId = { ...data, id: data.id || crypto.randomUUID() };

        // Add to characters list if not already present
        setCharacters((chars) => {
          const exists = chars.some((c) => c.id === characterWithId.id);
          if (!exists) {
            return [...chars, characterWithId];
          }
          return chars.map((c) =>
            c.id === characterWithId.id ? characterWithId : c
          );
        });

        // Select this character
        setSelectedId(characterWithId.id);

        // Reset to step 1 for editing
        setStep(1);
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
    <div className="min-h-screen bg-forest-950 bg-forest-texture text-parchment-50">
      {/* Print styles */}
      <style>{`@media print { #app-controls, #helper-panel { display: none !important; } #sheet { box-shadow: none !important; border: none !important; background: white !important; color: black !important; } body { background: white !important; } }`}</style>

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
              {selectedChar && (
                <div className="gap-4 flex pb-8 items-center">
                  <h1 className="text-4xl text-parchment-100 font-bold font-serif tracking-wide flex-1">
                    {selectedChar?.name ? selectedChar.name : 'Nuevo Personaje'}
                  </h1>

                  {/* Mobile collapse toggle */}
                  <button
                    className="md:hidden p-2 rounded-lg bg-forest-700 hover:bg-forest-600 transition-colors"
                    onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                    title={
                      isFormCollapsed
                        ? 'Mostrar formulario'
                        : 'Ocultar formulario'
                    }
                  >
                    {isFormCollapsed ? (
                      <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                      <ChevronUpIcon className="h-5 w-5" />
                    )}
                  </button>

                  {selectedId && (
                    <button
                      className="justify-center p-2 rounded-lg bg-red-700 hover:bg-red-600 transition-colors"
                      onClick={() => deleteCharacter(selectedId)}
                      title="Eliminar personaje"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}

              {selectedChar && (
                <div
                  className={`transition-all duration-300 ${
                    isFormCollapsed
                      ? 'max-h-0 overflow-hidden opacity-0 md:max-h-none md:overflow-visible md:opacity-100'
                      : 'max-h-none'
                  }`}
                >
                  <CharacterForm
                    character={state}
                    dispatch={dispatch}
                    currentStep={step}
                    onStepChange={setStep}
                    onShowModal={showModal}
                    onDownloadJSON={onDownloadJSON}
                    onShareLink={onShareLink}
                  />
                </div>
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

      <footer className="max-w-5xl mx-auto px-4 pb-10 text-center text-sm text-mist-400">
        Basado en <b>Lenguaje Hábitat</b>, por Javier Morales Vargas, Copyright
        2025
        <br />
        <p className="underline">
          <a
            href="https://aventuraenlafogata.itch.io/lenguaje-habitat"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en itch.io
          </a>
        </p>
        Hecho con ♥ por Carlos Vega para jugar aventuras en cualquier{' '}
        <i>hábitat</i>. — Guardado automático en tu navegador.
      </footer>
    </div>
  );
}
