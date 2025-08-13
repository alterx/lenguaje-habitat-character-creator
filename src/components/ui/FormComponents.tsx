import { Select } from './Select';

interface SetSelectorProps<T extends string> {
  label: string;
  value: T;
  sets: Record<T, number[]>;
  formatValue: (values: number[]) => string;
  onChange: (key: T) => void;
}

export function SetSelector<T extends string>({
  label,
  value,
  sets,
  formatValue,
  onChange,
}: SetSelectorProps<T>) {
  return (
    <div className="mb-3">
      <label className="text-sm font-medium text-forest-700">{label}</label>
      <div className="mt-2 flex gap-2">
        {(Object.keys(sets) as T[]).map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 rounded-xl border transition-colors ${
              value === key
                ? 'bg-forest-700 text-parchment-100 border-forest-600'
                : 'bg-forest-800/60 border-forest-600 text-parchment-200 hover:bg-forest-700/80'
            }`}
          >
            {key}: {formatValue(sets[key])}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ValueSelectProps {
  label: string;
  value: number | null;
  options: number[];
  allowedCounts: Record<number, number>;
  assignedCounts: Record<number, number>;
  formatOption: (value: number) => string;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export function ValueSelect({
  label,
  value,
  options,
  allowedCounts,
  assignedCounts,
  formatOption,
  onChange,
  placeholder = '— Elegir —',
}: ValueSelectProps) {
  const selectOptions = options.map((v) => {
    const allowed = allowedCounts[v] ?? 0;
    const assigned = assignedCounts[v] ?? 0;
    const disabled = assigned >= allowed && value !== v;
    return {
      value: v,
      label: formatOption(v),
      disabled,
    };
  });

  return (
    <Select
      label={label}
      value={value?.toString() ?? ''}
      onChange={(val) => onChange(val === '' ? null : Number(val))}
      options={selectOptions}
      placeholder={placeholder}
      className="w-full"
      variant="form"
    />
  );
}
