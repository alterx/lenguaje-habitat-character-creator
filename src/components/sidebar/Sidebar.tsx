import { DiceRoller } from './DiceRoller';
import { AdventurePoints } from './AdventurePoints';
import { QuickRules } from './QuickRules';
import type { Character, CharacterAction } from '../../types/Character';
import { Log } from '../../types/Game';

interface SidebarProps {
  character: Character;
  dispatch: React.Dispatch<CharacterAction>;
  diceLog: Log[];
  lastRoll: string | null;
  onRoll: (result: string) => void;
  onClearLog: () => void;
  onToast: (message: string) => void;
  onShowModal: (
    message: string,
    options?: {
      title?: string;
      type?: 'info' | 'error' | 'warning' | 'confirm';
      onConfirm?: () => void;
    }
  ) => void;
}

export function Sidebar({
  character,
  dispatch,
  diceLog,
  lastRoll,
  onRoll,
  onClearLog,
  onToast,
  onShowModal,
}: SidebarProps) {
  return (
    <aside id="helper-panel" className="space-y-4">
      <DiceRoller
        character={character}
        dispatch={dispatch}
        lastRoll={lastRoll}
        onRoll={onRoll}
        onToast={onToast}
        onClearLog={onClearLog}
        diceLog={diceLog}
        onShowModal={onShowModal}
      />
      <AdventurePoints character={character} dispatch={dispatch} />
      <QuickRules />
    </aside>
  );
}
