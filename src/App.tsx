import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Header } from './components/layout/Header';
import { WelcomeScreen } from './components/character/WelcomeScreen';
import { CharacterForm } from './components/character/CharacterForm';
import { CharacterSheet } from './components/character/CharacterSheet';
import { Sidebar } from './components/sidebar/Sidebar';
import { Modal } from './components/ui/Modal';
import { Toast } from './components/ui/Toast';
import { Button } from './components/ui/Button';
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
  PencilSquareIcon,
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
      if (selectedChar.status === 'ready') {
        setIsPlaying(true);
        setStep(5);
      }
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
    setIsPlaying(false);
    setStep(1);
    const newChar = createEmptyCharacter();
    setCharacters((chars) => [...chars, newChar]);
    setSelectedId(newChar.id);
  }

  function deleteCharacter(id: string) {
    const characterToDelete = characters.find((c) => c.id === id);
    const characterName = characterToDelete?.name || 'Sin nombre';

    showModal(
      `¿Estás seguro de que querés eliminar el protagoinista "${characterName}"? Esta acción no se puede deshacer.`,
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
  const [step, setStep] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepParam = urlParams.get('step');
    return stepParam ? parseInt(stepParam, 10) || 1 : 1;
  });

  // Playing state management
  const [isPlaying, setIsPlaying] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('playing') === 'true';
  });

  // Update URL when step or playing state changes
  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);

    if (step !== 1) {
      params.set('step', step.toString());
    } else {
      params.delete('step');
    }

    if (isPlaying) {
      params.set('playing', 'true');
      params.set('step', '5');
    } else {
      params.delete('playing');
    }

    const newUrl = `${url.pathname}${
      params.toString() ? '?' + params.toString() : ''
    }${url.hash}`;
    window.history.replaceState({}, '', newUrl);
  }, [step, isPlaying]);

  // Mobile form collapse state
  const [isFormCollapsed, setIsFormCollapsed] = useState(false);

  // Preview mode state
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewCharacter, setPreviewCharacter] = useState<Character | null>(
    null
  );

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
        // Enter preview mode with the loaded character
        setIsPreviewMode(true);
        setPreviewCharacter(loaded);
        // Don't clear the hash yet - let user decide what to do
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

  // Preview mode functions
  function savePreviewCharacter() {
    if (previewCharacter) {
      // Create a new character with a unique ID
      const newCharWithId = { ...previewCharacter, id: crypto.randomUUID() };
      setCharacters((chars) => [...chars, newCharWithId]);
      setSelectedId(newCharWithId.id);
      setIsPreviewMode(false);
      setPreviewCharacter(null);
      // Clear the hash from URL
      window.history.replaceState(
        {},
        document.title,
        window.location.pathname + window.location.search
      );
      pushToast('Protagonista guardado en tu colección');
    }
  }

  function discardPreview() {
    setIsPreviewMode(false);
    setPreviewCharacter(null);
    // Clear the hash from URL
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + window.location.search
    );
  }

  function onDownloadJSON() {
    download(
      `${state.name || 'protagonista'}.json`,
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
          isPreviewMode
            ? 'flex justify-center'
            : selectedChar
            ? isPlaying
              ? 'grid md:grid-cols-[1fr_320px] gap-4 md:gap-6'
              : 'grid md:grid-cols-1 gap-4 md:gap-6'
            : ''
        }`}
      >
        <div>
          {isPreviewMode && previewCharacter ? (
            // Preview mode UI
            <div className="mx-auto space-y-6">
              <div className="bg-forest-700 rounded-xl p-4 border-2 border-forest-600">
                <h2 className="text-2xl font-bold text-parchment-100 mb-2 font-serif">
                  Vista previa del protagonista
                </h2>
                <p className="text-parchment-200 mb-4">
                  Alguien compartió contigo este protagonista. Podés guardarlo
                  en tu colección o simplemente verlo.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="primary"
                    onPress={savePreviewCharacter}
                    label="Guardar en mi colección"
                  />
                  <Button
                    variant="destructive"
                    onPress={discardPreview}
                    label="Cerrar"
                  />
                </div>
              </div>

              {/* Show character sheet in preview */}
              <CharacterSheet character={previewCharacter} isPreview={true} />
            </div>
          ) : !selectedChar ? (
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
                    {selectedChar?.name ? selectedChar.name : 'Sin Nombre'}
                  </h1>

                  {/* Mobile collapse toggle */}
                  <button
                    className="md:hidden p-2 rounded-lg bg-forest-700 hover:bg-forest-600 transition-colors"
                    onClick={() => setIsFormCollapsed(!isFormCollapsed)}
                  >
                    {isFormCollapsed ? (
                      <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                      <ChevronUpIcon className="h-5 w-5" />
                    )}
                  </button>

                  {isPlaying && (
                    <button
                      className="p-2 rounded-lg bg-forest-700 hover:bg-forest-600 transition-colors"
                      onClick={() => setIsPlaying(false)}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                  )}

                  {selectedId && (
                    <button
                      className="p-2 rounded-lg bg-red-700 hover:bg-red-600 transition-colors"
                      onClick={() => deleteCharacter(selectedId)}
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
                    isPlaying={isPlaying}
                    onStartPlaying={() => {
                      setIsPlaying(true);
                      dispatch({ type: 'setStatus', value: 'ready' });
                    }}
                    onStopPlaying={() => setIsPlaying(false)}
                  />
                </div>
              )}
            </>
          )}
        </div>

        {/* Helper Panel - Only show when user has interacted, not in preview mode, and not playing */}
        {selectedChar && !isPreviewMode && isPlaying && (
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
        Basado en <strong>Lenguaje Hábitat</strong>, por Javier Morales Vargas,
        Copyright 2025
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
        <br />
        Hecho con ♥ por Carlos Vega para jugar aventuras en cualquier{' '}
        <i>hábitat</i>, Copyright 2025
        <br />
        <p className="underline">
          <a
            href="https://github.com/alterx/lenguaje-habitat-character-creator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver en github.com
          </a>
        </p>
        <br />
        Guardado automático en tu navegador.
      </footer>
    </div>
  );
}
