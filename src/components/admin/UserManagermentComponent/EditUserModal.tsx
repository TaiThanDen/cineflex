import React, { useState } from "react";
import type { User } from "src/components/data/User";

interface Props {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<Props> = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState({ ...user });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md z-10 relative">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa người dùng</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Họ tên</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Ảnh đại diện (URL)</label>
                        <input
                            type="text"
                            name="profile"
                            value={formData.profile}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-1">Vai trò</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="User">User</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                                <option value="UserVip">UserVip</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-1">Trạng thái</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            >
                                <option value="Active">Hoạt động</option>
                                <option value="Banned">Bị cấm</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
                            Hủy
                        </button>
                        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
                            Lưu
                        </button>
                    </div>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default EditUserModal;
