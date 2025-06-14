import React from "react";
import { Trash2, X } from "lucide-react";

interface Props {
    userName: string;
    onClose: () => void;
    onConfirm: () => void;
}

const UserDeleteModal: React.FC<Props> = ({ userName, onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Background mờ */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            <div className="bg-white rounded-xl shadow-lg w-full max-w-md z-10 overflow-hidden">
                {/* Header đỏ */}
                <div className="bg-red-600 text-white px-6 py-3 flex justify-between items-center">
                    <h2 className="font-bold text-lg">Xóa người dùng</h2>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 text-center">
                    <div className="text-red-500 mb-4">
                        <Trash2 size={48} className="mx-auto" />
                    </div>
                    <p className="font-semibold">
                        Bạn có chắc chắn muốn xoá người dùng "<strong>{userName}</strong>" không? Thao tác này không thể hoàn tác.
                    </p>

                    <div className="flex justify-center gap-4 mt-6">
                        <button
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded flex items-center gap-1"
                            onClick={onConfirm}
                        >
                            <Trash2 size={16} />
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDeleteModal;
