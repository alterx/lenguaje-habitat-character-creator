// Basic UI components

import React from 'react';

export function Divider() {
  return <div className="h-px w-full bg-neutral-200 my-6" />;
}

export function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-amber-100 rounded-2xl shadow-sm border border-amber-300 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-1 text-green-900">{title}</h2>
      {subtitle && <p className="text-green-700 text-sm mb-4">{subtitle}</p>}
      {children}
    </section>
  );
}

export function StepHeader({
  step,
  total,
  title,
}: {
  step: number;
  total: number;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="px-3 py-1 rounded-full bg-green-800 text-white text-sm font-medium">
        Paso {step} / {total}
      </div>
      <h3 className="text-lg font-semibold text-green-900">{title}</h3>
    </div>
  );
}
