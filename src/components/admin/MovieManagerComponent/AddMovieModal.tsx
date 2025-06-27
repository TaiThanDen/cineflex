import React, { useState } from "react";
import { useShowMutations, type ShowFormData } from "@/lib/hooks/useShowMutations";

interface Props {
    onClose: () => void;
    onAdd?: (newMovie: ShowFormData) => void; // Optional callback for custom handling
}

const AddMovieModal: React.FC<Props> = ({ onClose, onAdd }) => {
    const { addShowAsync, isAddingShow, addShowError } = useShowMutations();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        releaseDate: "",
        thumbnail: "",
        onGoing: false,
        isSeries: true,
        ageRating: "13+",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Validate title
        if (!formData.title.trim()) {
            newErrors.title = "Tên phim là bắt buộc";
        } else if (formData.title.length < 2) {
            newErrors.title = "Tên phim phải có ít nhất 2 ký tự";
        }

        // Validate description
        if (!formData.description.trim()) {
            newErrors.description = "Mô tả phim là bắt buộc";
        } else if (formData.description.length < 10) {
            newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
        }

        // Validate release date
        if (!formData.releaseDate) {
            newErrors.releaseDate = "Ngày phát hành là bắt buộc";
        }

        // Validate thumbnail
        if (!formData.thumbnail.trim()) {
            newErrors.thumbnail = "URL poster là bắt buộc";
        } else {
            // Basic URL validation
            try {
                new URL(formData.thumbnail);
            } catch {
                newErrors.thumbnail = "URL poster không hợp lệ";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            // Sử dụng API để thêm show
            await addShowAsync(formData);
            alert("Thêm phim thành công!");

            // Call custom callback if provided
            if (onAdd) {
                onAdd(formData);
            }

            onClose();
        } catch (error) {
            console.error("Lỗi khi thêm phim:", error);
            alert("Có lỗi xảy ra khi thêm phim!");
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Thêm phim mới</h2>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Tên phim *
                        </label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.title ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Nhập tên phim..."
                        />
                        {errors.title && (
                            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                        )}
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            URL Poster *
                        </label>
                        <input
                            type="url"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.thumbnail ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.thumbnail}
                            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
                            placeholder="https://example.com/poster.jpg"
                        />
                        {errors.thumbnail && (
                            <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Mô tả phim *
                        </label>
                        <textarea
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? "border-red-500" : "border-gray-300"
                                }`}
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Mô tả nội dung, cốt truyện của phim..."
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                        )}
                        <p className="text-gray-500 text-sm mt-1">
                            {formData.description.length}/500 ký tự
                        </p>
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Ngày phát hành *
                        </label>
                        <input
                            type="date"
                            className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.releaseDate ? "border-red-500" : "border-gray-300"
                                }`}
                            value={formData.releaseDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, releaseDate: e.target.value }))}
                        />
                        {errors.releaseDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.releaseDate}</p>
                        )}
                    </div>

                    {/* Age Rating */}
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">
                            Độ tuổi
                        </label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={formData.ageRating}
                            onChange={(e) => setFormData(prev => ({ ...prev, ageRating: e.target.value }))}
                        >
                            <option value="G">G - Phù hợp với mọi lứa tuổi</option>
                            <option value="PG">PG - Cần sự hướng dẫn của cha mẹ</option>
                            <option value="13+">13+ - Trên 13 tuổi</option>
                            <option value="16+">16+ - Trên 16 tuổi</option>
                            <option value="18+">18+ - Người lớn</option>
                        </select>
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="isSeries"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                checked={formData.isSeries}
                                onChange={(e) => setFormData(prev => ({ ...prev, isSeries: e.target.checked }))}
                            />
                            <label htmlFor="isSeries" className="text-sm font-medium text-gray-700">
                                Là series (có nhiều tập)
                            </label>
                        </div>

                        <div className="flex items-center space-x-3">
                            <input
                                type="checkbox"
                                id="onGoing"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                checked={formData.onGoing}
                                onChange={(e) => setFormData(prev => ({ ...prev, onGoing: e.target.checked }))}
                            />
                            <label htmlFor="onGoing" className="text-sm font-medium text-gray-700">
                                Đang phát sóng
                            </label>
                        </div>
                    </div>

                    {/* Error display */}
                    {addShowError && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-600 text-sm">
                                Có lỗi xảy ra: {addShowError.message || "Không thể thêm phim"}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            onClick={onClose}
                            disabled={isAddingShow}
                        >
                            Hủy bỏ
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
                            disabled={isAddingShow}
                        >
                            {isAddingShow ? "Đang thêm..." : "Thêm phim"}
                        </button>
                    </div>
                </form>

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
                    disabled={isAddingShow}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AddMovieModal;
