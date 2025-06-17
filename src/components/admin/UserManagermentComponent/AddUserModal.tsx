import React, { useState } from "react";

interface Props {
    onClose: () => void;
    onAdd: (user: {
        name: string;
        email: string;
        phone: string;
        role: "User" | "Admin" | "Moderator" | "UserVip";
        description: string;
    }) => void;
}

const AddUserModal: React.FC<Props> = ({ onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState<"User" | "Admin" | "Moderator" | "UserVip">("User");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        onAdd({ name, email, phone, role, description });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white w-full max-w-md rounded-xl p-6 z-10 shadow-lg">
                <h2 className="text-xl font-bold mb-4">Thêm người dùng</h2>
                <div className="space-y-3">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <select
                        className="w-full border p-2 rounded"
                        value={role}
                        onChange={(e) => setRole(e.target.value as any)}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderator">Moderator</option>
                        <option value="UserVip">UserVip</option>
                    </select>
                    <textarea
                        className="w-full border p-2 rounded"
                        placeholder="Mô tả"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                    >
                        Thêm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
