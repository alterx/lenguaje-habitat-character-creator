interface ToastProps {
  message: string | null;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  return (
    <div
      aria-live="polite"
      className={`fixed inset-x-0 bottom-6 z-30 flex justify-center print:hidden transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {message && (
        <div className="px-3 py-2 rounded-xl shadow-2xl bg-forest-800/90 backdrop-blur-sm text-parchment-100 text-sm border border-forest-600">
          {message}
        </div>
      )}
    </div>
  );
}
