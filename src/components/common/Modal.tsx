import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg p-6 z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="text-gray-700 dark:text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;