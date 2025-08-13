interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: 'info' | 'error' | 'warning' | 'confirm';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  onConfirm,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
}: ModalProps) {
  const isConfirm = type === 'confirm' && onConfirm;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          icon: '❌',
          bgColor: 'bg-red-900/90',
          borderColor: 'border-red-600',
          titleColor: 'text-red-200',
          iconColor: 'text-red-400',
        };
      case 'warning':
        return {
          icon: '⚠️',
          bgColor: 'bg-parchment-800/90',
          borderColor: 'border-parchment-600',
          titleColor: 'text-parchment-200',
          iconColor: 'text-parchment-400',
        };
      case 'confirm':
        return {
          icon: '❓',
          bgColor: 'bg-forest-800/90',
          borderColor: 'border-forest-600',
          titleColor: 'text-parchment-200',
          iconColor: 'text-mist-400',
        };
      default:
        return {
          icon: 'ℹ️',
          bgColor: 'bg-forest-800/90',
          borderColor: 'border-forest-600',
          titleColor: 'text-parchment-200',
          iconColor: 'text-mist-400',
        };
    }
  };

  const styles = getTypeStyles();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center print:hidden">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-2xl border-2 backdrop-blur-sm ${styles.bgColor} ${styles.borderColor}`}
      >
        <div className="flex items-start gap-4">
          <div className={`text-2xl ${styles.iconColor}`}>{styles.icon}</div>

          <div className="flex-1">
            {title && (
              <h3
                className={`text-lg font-semibold mb-2 font-serif ${styles.titleColor}`}
              >
                {title}
              </h3>
            )}

            <p className="text-parchment-200 mb-6">{message}</p>

            <div className="flex gap-3 justify-end">
              {isConfirm ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-forest-700 hover:bg-forest-600 border border-forest-600 text-parchment-200 text-sm transition-colors"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg bg-forest-600 hover:bg-forest-500 border border-forest-500 text-parchment-100 text-sm transition-colors"
                  >
                    {confirmText}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-forest-700 hover:bg-forest-600 border border-forest-600 text-parchment-100 text-sm transition-colors"
                >
                  {confirmText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
