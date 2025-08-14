import { Character } from '../../types/Character';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

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
      <div className="bg-parchment-300 bg-paper-texture backdrop-blur-sm rounded-2xl border border-parchment-600 p-8 max-w-md mx-auto shadow-2xl">
        <h2 className="text-2xl font-semibold text-forest-800 mb-4 font-serif">
          ¡Bienvenido!
        </h2>
        <p className="text-forest-700 mb-6">
          Comenzá creando un nuevo protagonista
        </p>
        <Button
          variant="primary"
          size="large"
          onPress={onCreateCharacter}
          label={
            isFirstCharacter ? '¡Crear mi primer protagonista!' : '¡Vamos!'
          }
        />
        <hr className="my-6 border-forest-600" />
        <p className="text-forest-700 mb-3 mt-6 font-light text-xs">
          También podés
        </p>
        <label className="px-3 py-1.5 rounded-xl bg-forest-800 hover:bg-forest-700 text-xs cursor-pointer text-parchment-200 border border-forest-600 transition-colors">
          <CloudArrowUpIcon className="h-4 w-4 inline-block mr-1" />
          Cargar Protagonista
          <input
            type="file"
            accept="application/json"
            className="sr-only"
            onChange={onUploadJSON}
          />
        </label>

        {characters.length > 0 && (
          <>
            <p className="text-forest-700 mb-3 mt-3 font-light text-xs">
              o seleccionar uno existente
            </p>
            <Select
              variant="compact"
              value={selectedId}
              onChange={onSelectCharacter}
              options={characters.map((c) => ({
                value: c.id,
                label: c.name || 'Sin nombre',
              }))}
              placeholder="Seleccionar protagonista..."
            />
            {selectedId && (
              <Button
                variant="destructive"
                size="small"
                onPress={() => onDeleteCharacter(selectedId)}
                label="Eliminar"
                className="mt-2"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
