import React, { useState } from "react";
import GenreSelector from "./GenreSelector";
import {
  useShowMutations,
  type ShowFormData,
} from "@/lib/hooks/useShowMutations";

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
    releaseDate?: string;
    onGoing?: boolean;
    isSeries?: boolean;
    ageRating?: string;
    tags?: string[];
    genres?: Genre[];
  };
  onClose: () => void;
  onSave?: (updatedMovie: any) => void;
}

const EditMovieModal: React.FC<Props> = ({ movie, onClose, onSave }) => {
  const { updateShowAsync, isUpdatingShow, updateShowError } =
    useShowMutations();

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(
    movie.genres || []
  );
  const [title, setTitle] = useState(movie.title);
  const [thumbnail, setThumbnail] = useState(movie.thumbnail);
  const [description, setDescription] = useState(movie.description);
  const [releaseDate, setReleaseDate] = useState(movie.releaseDate || "");
  const [onGoing, setOnGoing] = useState(movie.onGoing ?? true);
  const [isSeries, setIsSeries] = useState(movie.isSeries ?? true);
  const [ageRating, setAgeRating] = useState(movie.ageRating || "G");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Tên phim là bắt buộc";
    }

    if (!thumbnail.trim()) {
      newErrors.thumbnail = "URL poster là bắt buộc";
    }

    if (!description.trim()) {
      newErrors.description = "Mô tả là bắt buộc";
    }

    if (!releaseDate.trim()) {
      newErrors.releaseDate = "Ngày phát hành là bắt buộc";
    }

    if (!ageRating.trim()) {
      newErrors.ageRating = "Độ tuổi xem là bắt buộc";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!movie.id) {
      alert("Không tìm thấy ID phim để cập nhật");
      return;
    }

    const showData: ShowFormData = {
      title,
      thumbnail,
      description,
      releaseDate,
      onGoing,
      isSeries,
      ageRating,
    };

    try {
      const updatedShow = await updateShowAsync({
        showId: movie.id,
        data: showData,
      });

      alert("Cập nhật phim thành công!");

      // Call custom callback if provided
      if (onSave) {
        onSave(updatedShow);
      }

      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật phim:", error);
      alert("Có lỗi xảy ra khi cập nhật phim. Vui lòng thử lại!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin phim</h2>

        {/* Error Display */}
        {updateShowError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline"> {updateShowError.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên phim</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.title ? "border-red-500" : "border-gray-400"
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              URL Poster
            </label>
            <input
              type="url"
              className={`w-full border rounded px-3 py-2 ${
                errors.thumbnail ? "border-red-500" : "border-gray-400"
              }`}
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              required
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-xs mt-1">{errors.thumbnail}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Ngày phát hành
            </label>
            <input
              type="date"
              className={`w-full border rounded px-3 py-2 ${
                errors.releaseDate ? "border-red-500" : "border-gray-400"
              }`}
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
            {errors.releaseDate && (
              <p className="text-red-500 text-xs mt-1">{errors.releaseDate}</p>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Đang phát sóng
              </label>
              <select
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={onGoing ? "true" : "false"}
                onChange={(e) => setOnGoing(e.target.value === "true")}
              >
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-semibold mb-1">
                Là phim bộ
              </label>
              <select
                className="w-full border border-gray-400 rounded px-3 py-2"
                value={isSeries ? "true" : "false"}
                onChange={(e) => setIsSeries(e.target.value === "true")}
              >
                <option value="true">Có</option>
                <option value="false">Không</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Độ tuổi xem
            </label>
            <select
              className={`w-full border rounded px-3 py-2 ${
                errors.ageRating ? "border-red-500" : "border-gray-400"
              }`}
              value={ageRating}
              onChange={(e) => setAgeRating(e.target.value)}
              required
            >
              <option value="">-- Chọn độ tuổi --</option>
              <option value="G">G - Mọi lứa tuổi</option>
              <option value="PG">PG - Cần hướng dẫn của phụ huynh</option>
              <option value="PG-13">PG-13 - Từ 13 tuổi trở lên</option>
              <option value="R">R - Từ 17 tuổi trở lên</option>
              <option value="NC-17">NC-17 - Từ 18 tuổi trở lên</option>
            </select>
            {errors.ageRating && (
              <p className="text-red-500 text-xs mt-1">{errors.ageRating}</p>
            )}
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
              className={`w-full border rounded px-3 py-2 ${
                errors.description ? "border-red-500" : "border-gray-400"
              }`}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="bg-gray-200 rounded px-4 py-2 disabled:opacity-50"
              onClick={onClose}
              disabled={isUpdatingShow}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded px-4 py-2 hover:bg-indigo-700 font-semibold disabled:opacity-50"
              disabled={isUpdatingShow}
            >
              {isUpdatingShow ? "Đang lưu..." : "Lưu thay đổi"}
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
