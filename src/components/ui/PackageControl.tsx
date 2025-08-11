// Package control component for managing adventure points

import React from 'react';
import type { PackageName } from '../../types/Character';

interface PackageControlProps {
  name: PackageName;
  current: number;
  max: number | null;
  onChange: (value: number) => void;
}

export function PackageControl({
  name,
  current,
  max,
  onChange,
}: PackageControlProps) {
  return (
    <li className="flex items-center justify-between gap-2">
      <div className="text-sm">
        <div className="font-bold text-green-900">{name}</div>
        <div className="text-xs text-green-700">
          {current} / {max ?? '—'}
        </div>
      </div>
      <div className="flex gap-1">
        <button
          className="px-2 py-1 rounded-lg border border-amber-400 bg-amber-200 hover:bg-amber-300 text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onChange(current + 1)}
          disabled={max !== null && current >= max}
        >
          +1
        </button>
        <button
          className="px-2 py-1 rounded-lg border border-amber-400 bg-amber-200 hover:bg-amber-300 text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onChange(Math.max(0, current - 1))}
          disabled={current <= 0}
        >
          -1
        </button>
        <button
          className="px-2 py-1 rounded-lg border border-amber-400 bg-amber-200 hover:bg-amber-300 text-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onChange(max ?? 0)}
          disabled={max === null}
        >
          Reestablecer
        </button>
      </div>
    </li>
  );
}
