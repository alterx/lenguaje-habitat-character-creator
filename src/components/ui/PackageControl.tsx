import type { PackageName } from '../../types/Character';
import {
  ArrowPathIcon,
  MinusCircleIcon,
  NoSymbolIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/solid';
import { Button } from './Button';

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
    <li className="grid grid-cols-[auto_auto_2fr_auto_auto] gap-1">
      <Button
        variant="secondary"
        onPress={() => onChange(0)}
        disabled={max === null}
        icon={<NoSymbolIcon className="h-5 w-5" />}
      />
      <Button
        variant="secondary"
        onPress={() => onChange(Math.max(0, current - 1))}
        disabled={current <= 0}
        icon={<MinusCircleIcon className="h-5 w-5" />}
      />
      <div className="text-sm text-center">
        <div className="font-bold text-forest-800">{name}</div>
        <div className="text-sm text-forest-700">
          {`${current} ${name !== 'Recursos' ? '/ ' + (max ?? '—') : ''}`}
        </div>
      </div>
      <Button
        variant="secondary"
        onPress={() => onChange(current + 1)}
        disabled={max !== null && current >= max && name !== 'Recursos'}
        icon={<PlusCircleIcon className="h-5 w-5" />}
      />

      <Button
        variant="secondary"
        onPress={() => onChange(max ?? 0)}
        disabled={max === null}
        icon={<ArrowPathIcon className="h-5 w-5" />}
      />
    </li>
  );
}
