interface DiceLogProps {
  log: { time: number; text: string }[];
  onClear: () => void;
}

export function DiceLog({ log, onClear }: DiceLogProps) {
  return (
    <>
      <h2 className="font-semibold text-forest-800 mt-4">
        Historial de tiradas
      </h2>
      <ul className="mt-3 space-y-1 max-h-48 overflow-auto text-sm">
        {log.length === 0 && (
          <li className="text-forest-800 text-center">Sin tiradas.</li>
        )}
        {log.map((l, i) => (
          <li
            key={i}
            className="text-center px-3 py-2 border border-amber-300 rounded-xl bg-amber-50 text-green-900"
          >
            {l.text}
            <p className="text-xs text-parchment-900">
              {new Date(l.time).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
      {log.length > 0 && (
        <div className="mt-2 text-right">
          <button
            className="text-xs text-green-700 underline hover:text-green-900"
            onClick={onClear}
          >
            Limpiar
          </button>
        </div>
      )}
    </>
  );
}
