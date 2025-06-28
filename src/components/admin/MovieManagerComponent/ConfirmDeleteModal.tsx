import React, { useState } from "react";
import { Trash2, X } from "lucide-react";

interface Props {
  title?: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
}

const ConfirmDeleteModal: React.FC<Props> = ({
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onClose,
  onConfirm,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch (error) {
      console.error("Error during deletion:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md z-10 overflow-hidden">
        <div className="bg-red-500 text-white px-6 py-3 flex justify-between items-center">
          <h2 className="font-bold text-lg">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl"
            disabled={isDeleting}
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 text-center">
          <div className="text-red-500 mb-4">
            <Trash2 size={48} className="mx-auto" />
          </div>
          <p className="mb-2 font-semibold">{message}</p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded disabled:opacity-50"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-1 disabled:opacity-50"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              <Trash2 size={16} />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
