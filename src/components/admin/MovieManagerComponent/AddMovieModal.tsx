import React, { useState } from "react";

interface Props {
    onClose: () => void;
    onAdd: (newMovie: {
        title: string;
        tags: string[];
        description: string;
        poster: string;
    }) => void;
}

const AddMovieModal: React.FC<Props> = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const tagList = tags.split(",").map(tag => tag.trim()).filter(Boolean);
        onAdd({ title, tags: tagList, description, poster });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
                <h2 className="text-xl font-bold mb-4">Thêm phim mới</h2>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Tên phim</label>
                        <input
                            type="text"
                            className="w-full border border-gray-400 rounded px-3 py-2"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Poster (URL hình ảnh)</label>
                        <input
                            type="text"
                            className="w-full border border-gray-400 rounded px-3 py-2"
                            value={poster}
                            onChange={(e) => setPoster(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Thể loại</label>
                        <input
                            type="text"
                            className="w-full border border-gray-400 rounded px-3 py-2"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Mô tả</label>
                        <textarea
                            className="w-full border border-gray-400 rounded px-3 py-2"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <button type="button" className="bg-gray-200 rounded px-4 py-2" onClick={onClose}>
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 font-semibold"
                        >
                            Thêm
                        </button>
                    </div>
                </form>
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-2xl font-bold"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default AddMovieModal;
