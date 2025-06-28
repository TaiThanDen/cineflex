import React, { useState } from "react";
import type { Season } from "@/lib/types/Season";
import {
  useEpisodeMutations,
  type EpisodeFormData,
} from "@/lib/hooks/useEpisodeMutations";

interface Props {
  seasons: Season[];
  onClose: () => void;
  onAdd?: (episodeData: EpisodeFormData) => void; // Optional callback for custom handling
}

const AddEpisodeModal: React.FC<Props> = ({ seasons, onClose, onAdd }) => {
  const { addEpisodeAsync, isAddingEpisode, addEpisodeError } =
    useEpisodeMutations();

  const [formData, setFormData] = useState({
    seasonId: seasons[0]?.id || "",
    name: "",
    url: "",
    duration: "",
    description: "",
    episodeNumber: 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.seasonId) {
      newErrors.seasonId = "Vui lòng chọn mùa phim";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Tên tập phim là bắt buộc";
    }

    if (!formData.url.trim()) {
      newErrors.url = "ID video là bắt buộc";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Thời lượng là bắt buộc";
    } else {
      if (!isNaN(Number(formData.duration))) {
        newErrors.duration =
          'Định dạng thời lượng không hợp lệ';
      }
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả tập phim là bắt buộc";
    }

    if (formData.episodeNumber < 1) {
      newErrors.episodeNumber = "Số tập phải lớn hơn 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const episodeData: EpisodeFormData = {
      seasonId: formData.seasonId,
      name: formData.name,
      url: formData.url,
      duration: formData.duration,
      description: formData.description,
      episodeNumber: formData.episodeNumber,
    };

    try {
      // Sử dụng API để thêm episode
      await addEpisodeAsync(episodeData);

      // Thông báo thành công
      alert("Thêm tập phim thành công!");

      // Call custom callback if provided
      if (onAdd) {
        onAdd(episodeData);
      }

      // Đóng modal
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm episode:", error);
      alert("Có lỗi xảy ra khi thêm tập phim. Vui lòng thử lại!");
    }
  };

  const selectedSeason = seasons.find((s) => s.id === formData.seasonId);

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Thêm tập phim mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Display */}
          {addEpisodeError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">Lỗi!</strong>
              <span className="block sm:inline">
                {" "}
                {addEpisodeError.message}
              </span>
            </div>
          )}

          {/* Season Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Chọn mùa phim
            </label>
            <div className="relative">
              <select
                className={`w-full bg-white border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer ${
                  errors.seasonId ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.seasonId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seasonId: e.target.value,
                    episodeNumber: 1, // Default to episode 1 when changing season
                  }))
                }
              >
                <option value="">-- Chọn mùa phim --</option>
                {seasons.map((season) => (
                  <option key={season.id} value={season.id}>
                    {season.title}
                  </option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 absolute top-3.5 right-3 text-gray-400 pointer-events-none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                />
              </svg>
            </div>
            {errors.seasonId && (
              <p className="text-red-500 text-sm mt-1">{errors.seasonId}</p>
            )}

            {/* Selected Season Info */}
            {selectedSeason && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-medium text-green-800">
                  {selectedSeason.title}
                </h4>
                <p className="text-sm text-green-600 mt-1">
                  {selectedSeason.description}
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Phát hành:{" "}
                  {new Date(selectedSeason.releaseDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>

          {/* Episode Number */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Số tập
            </label>
            <input
              type="number"
              min={1}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.episodeNumber ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.episodeNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  episodeNumber: parseInt(e.target.value) || 1,
                }))
              }
              placeholder="Số tập trong mùa"
            />
            {errors.episodeNumber && (
              <p className="text-red-500 text-sm mt-1">
                {errors.episodeNumber}
              </p>
            )}
          </div>

          {/* Episode Name */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tên tập
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="VD: Pilot, The Beginning, Final Episode"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Video ID */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              ID Video
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.url ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
              placeholder="VD: abc123, video-id-456, episode-001"
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Nhập ID hoặc mã định danh của video
            </p>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Thời lượng
            </label>
            <input
              type="text"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.duration ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, duration: e.target.value }))
              }
              placeholder="VD: 45 phút, 1h 30m, 90 phút"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              Định dạng hỗ trợ: "45 phút", "1h 30m", "90 min"
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Mô tả tập phim
            </label>
            <textarea
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Mô tả nội dung, cốt truyện của tập phim này..."
              maxLength={500}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
            <p className="text-gray-500 text-sm mt-1">
              {formData.description.length}/500 ký tự
            </p>
          </div>

          {/* Preview Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-2">Xem trước:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div>
                <strong>Mùa:</strong> {selectedSeason?.title || "Chưa chọn"}
              </div>
              <div>
                <strong>Tập:</strong> {formData.episodeNumber} -{" "}
                {formData.name || "Chưa có tên"}
              </div>
              <div>
                <strong>Thời lượng:</strong> {formData.duration || "Chưa nhập"}
              </div>
              <div>
                <strong>Mô tả:</strong> {formData.description.substring(0, 100)}
                {formData.description.length > 100 ? "..." : ""}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onClose}
              disabled={isAddingEpisode}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isAddingEpisode}
            >
              {isAddingEpisode ? "Đang thêm..." : "Thêm tập phim"}
            </button>
          </div>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default AddEpisodeModal;
