import type { Character } from '../../types/Character';
import { CloudArrowUpIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useScrollDirection } from '../../hooks/useScrollDirection';

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
  const scrollDirection = useScrollDirection();

  return (
    <header
      className={`sticky top-0 z-20 backdrop-blur bg-mist-50/70 border-forest-900/90 shadow-lg transition-transform duration-300 ease-in-out ${
        scrollDirection === 'down' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-2 sm:py-3 flex items-center justify-center sm:justify-between">
        <div
          className={`flex items-center gap-3 ${
            selectedChar ? 'hidden sm:flex' : 'flex'
          }`}
        >
          <img
            src="/myn.png"
            alt="Logo"
            className="h-12 sm:h-20 w-auto my-2 sm:my-5"
          />
        </div>
        {selectedChar && (
          <div
            className={`flex-column ${selectedChar ? 'w-full sm:w-auto' : ''}`}
            id="app-controls"
          >
            <div className="flex items-center justify-center sm:justify-start gap-1 sm:gap-2 grid-cols-3">
              <Button
                variant="black"
                onPress={addCharacter}
                icon={<UserPlusIcon className="h-4 sm:h-5 w-4 sm:w-5" />}
                className="!px-2 sm:!px-2.5 !py-2 sm:!py-2.5"
              />
              <span className="text-black text-sm">|</span>
              <label className="px-2 sm:px-2.5 py-2 sm:py-2.5 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black text-white hover:bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl focus:ring-gray-500 font-medium">
                <CloudArrowUpIcon className="h-3 sm:h-4 w-3 sm:w-4" />

                <input
                  type="file"
                  accept="application/json"
                  className="sr-only"
                  onChange={onUploadJSON}
                />
              </label>
              {characters.length > 0 && (
                <>
                  <span className="text-black text-sm">|</span>
                  <Select
                    value={selectedId}
                    variant="black"
                    onChange={selectCharacter}
                    options={characters.map((c) => ({
                      value: c.id,
                      label: c.name || 'Sin nombre',
                    }))}
                    placeholder="Seleccionar personaje..."
                    className="text-xs sm:text-sm"
                  />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
