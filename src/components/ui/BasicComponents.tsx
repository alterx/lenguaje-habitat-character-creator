export function Divider() {
  return <div className="h-px w-full bg-forest-600 my-6" />;
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
    <section className="bg-parchment-300 bg-paper-texture backdrop-blur-sm rounded-2xl shadow-2xl border border-parchment-600 p-6 mb-6">
      <h2 className="text-xl font-semibold mb-1 text-forest-800 font-serif">
        {title}
      </h2>
      {subtitle && <p className="text-forest-700 text-sm mb-4">{subtitle}</p>}
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
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 mb-4">
      <div className="px-3 py-1 rounded-full bg-forest-700 border border-forest-600 text-parchment-100 text-sm font-medium">
        Paso {step} / {total}
      </div>
      <h3 className="text-lg font-semibold text-forest-700 font-serif text-center sm:text-left">
        {title}
      </h3>
    </div>
  );
}
