// Modal component for alerts and confirmations

import React from 'react';

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
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          titleColor: 'text-red-800',
          iconColor: 'text-red-600',
        };
      case 'warning':
        return {
          icon: '⚠️',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          titleColor: 'text-amber-800',
          iconColor: 'text-amber-600',
        };
      case 'confirm':
        return {
          icon: '❓',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          titleColor: 'text-blue-800',
          iconColor: 'text-blue-600',
        };
      default:
        return {
          icon: 'ℹ️',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          titleColor: 'text-green-800',
          iconColor: 'text-green-600',
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
        className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg border-2 ${styles.bgColor} ${styles.borderColor}`}
      >
        <div className="flex items-start gap-4">
          <div className={`text-2xl ${styles.iconColor}`}>{styles.icon}</div>

          <div className="flex-1">
            {title && (
              <h3 className={`text-lg font-semibold mb-2 ${styles.titleColor}`}>
                {title}
              </h3>
            )}

            <p className="text-gray-700 mb-6">{message}</p>

            <div className="flex gap-3 justify-end">
              {isConfirm ? (
                <>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white text-sm"
                  >
                    {confirmText}
                  </button>
                </>
              ) : (
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-green-800 hover:bg-green-700 text-white text-sm"
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
