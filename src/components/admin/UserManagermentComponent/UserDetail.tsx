import React from "react";

interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "User" | "Admin" | "Moderator" | "UserVip";
    status: "Active" | "Banned";
    profile: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onEdit?: (user: User) => void;
    onDelete?: (userId: string) => void;
}

const roleColors: Record<string, string> = {
    User: "bg-gray-200 text-gray-800",
    Admin: "bg-red-200 text-red-800",
    Moderator: "bg-yellow-200 text-yellow-800",
    UserVip: "bg-purple-200 text-purple-800",
};

const statusColors: Record<string, string> = {
    Active: "bg-green-100 text-green-600",
    Banned: "bg-red-100 text-red-600",
};

const UserDetailModal: React.FC<Props> = ({ isOpen, onClose, user, onEdit, onDelete }) => {
    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Nền mờ nhẹ */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10">
                {/* Nút đóng */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>

                {/* Avatar & Tên */}
                <div className="flex flex-col items-center">
                    <img
                        src={user.profile}
                        alt={user.name}
                        className="w-32 h-32 object-cover rounded-xl mb-3 border shadow"
                    />
                    <h2 className="text-xl font-bold text-center">{user.name}</h2>

                    <div className="flex gap-2 mt-2">
                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${roleColors[user.role]}`}>
                            {user.role}
                        </span>
                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${statusColors[user.status]}`}>
                            {user.status === "Active" ? "Hoạt động" : "Bị cấm"}
                        </span>
                    </div>
                </div>

                {/* Chi tiết */}
                <div className="mt-6 space-y-2 text-gray-700">
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>SĐT:</strong> {user.phone}</p>
                </div>

                {/* Nút hành động */}
                <div className="flex justify-end gap-2 mt-6">
                    {onEdit && (
                        <button
                            className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
                            onClick={() => onEdit(user)}
                        >
                            Sửa
                        </button>
                    )}
                    {onDelete && (
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => onDelete(user.id)}
                        >
                            Xóa
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDetailModal;
