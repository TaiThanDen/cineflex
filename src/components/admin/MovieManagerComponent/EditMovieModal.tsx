import React, { useState } from "react";
import GenreSelector from "./GenreSelector";

interface Genre {
  id: string;
  name: string;
}

interface Props {
  movie: {
    id?: string;
    title: string;
    thumbnail: string;
    description: string;
    tags?: string[];
    genres?: Genre[];
  };
  onClose: () => void;
  onSave: (updatedMovie: any) => void;
}

const EditMovieModal: React.FC<Props> = ({ movie, onClose, onSave }) => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    movie.genres || []
  );
  const [title, setTitle] = useState(movie.title);
  const [thumbnail, setThumbnail] = useState(movie.thumbnail);
  const [description, setDescription] = useState(movie.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMovie = {
      ...movie,
      title,
      thumbnail,
      description,
      genres: selectedGenres,
      // Giữ lại tags cho backward compatibility
      tags: movie.tags || [],
    };

    onSave(updatedMovie);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative z-10">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin phim</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <label className="block text-sm font-semibold mb-1">
              URL Poster
            </label>
            <input
              type="url"
              className="w-full border border-gray-400 rounded px-3 py-2"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
          </div>

          {/* Genre Selector */}
          <GenreSelector
            showId={movie.id}
            selectedGenres={selectedGenres}
            onGenresChange={setSelectedGenres}
          />

          {/* Fallback tags field cho mock data */}
          {movie.tags && movie.tags.length > 0 && (
            <div>
              <label className="block text-sm font-semibold mb-1">
                Thể loại (Legacy Tags)
              </label>
              <input
                type="text"
                className="w-full border border-gray-400 rounded px-3 py-2"
                defaultValue={movie.tags.join(", ")}
                disabled
                placeholder="Dữ liệu từ mock data"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <textarea
              className="w-full border border-gray-400 rounded px-3 py-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-gray-200 rounded px-4 py-2"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 font-semibold"
            >
              Lưu thay đổi
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

export default EditMovieModal;
