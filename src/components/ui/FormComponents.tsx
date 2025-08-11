// Form components for character creation

import React from 'react';

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
      <label className="text-sm font-medium text-green-900">{label}</label>
      <div className="mt-2 flex gap-2">
        {(Object.keys(sets) as T[]).map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 rounded-xl border ${
              value === key
                ? 'bg-green-800 text-white border-green-800'
                : 'bg-amber-200 border-amber-400 text-green-900 hover:bg-amber-300'
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
  return (
    <div>
      <label className="text-sm font-medium text-green-900">{label}</label>
      <select
        className="mt-1 w-full px-3 py-2 border border-amber-400 rounded-xl bg-amber-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-600"
        value={value ?? ''}
        onChange={(e) =>
          onChange(e.target.value === '' ? null : Number(e.target.value))
        }
      >
        <option value="">{placeholder}</option>
        {options.map((v, idx) => {
          const allowed = allowedCounts[v] ?? 0;
          const assigned = assignedCounts[v] ?? 0;
          const disabled = assigned >= allowed && value !== v;
          return (
            <option key={`${v}-${idx}`} value={v} disabled={disabled}>
              {formatOption(v)}
            </option>
          );
        })}
      </select>
    </div>
  );
}
