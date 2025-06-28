import React, { useState, useEffect } from "react";
import {
  useEpisodeMutations,
  type EpisodeFormData,
} from "@/lib/hooks/useEpisodeMutations";
import { formatSecondsToDisplay } from "@/lib/utils/episodeUtils";

interface Props {
  episode: any; // Current episode data
  seasons: any[]; // Available seasons
  onClose: () => void;
  onUpdate?: (episodeData: EpisodeFormData) => void; // Optional callback
}

const EditEpisodeModal: React.FC<Props> = ({
  episode,
  seasons: _seasons,
  onClose,
  onUpdate,
}) => {
  const { updateEpisodeAsync, isUpdatingEpisode, updateEpisodeError } =
    useEpisodeMutations();

  const [formData, setFormData] = useState({
    seasonId: episode.seasonId || "",
    name: episode.title || episode.name || "",
    url: episode.url || "",
    duration: episode.duration ? formatSecondsToDisplay(episode.duration) : "",
    description: episode.description || "",
    episodeNumber: parseInt(episode.number || episode.episodeNumber) || 1,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form when episode changes
  useEffect(() => {
    if (episode) {
      setFormData({
        seasonId: episode.seasonId || "",
        name: episode.title || episode.name || "",
        url: episode.url || "",
        duration: episode.duration
          ? formatSecondsToDisplay(episode.duration)
          : "",
        description: episode.description || "",
        episodeNumber: parseInt(episode.number || episode.episodeNumber) || 1,
      });
    }
  }, [episode]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên tập phim là bắt buộc";
    }

    if (!formData.url.trim()) {
      newErrors.url = "ID video là bắt buộc";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "Thời lượng là bắt buộc";
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
      await updateEpisodeAsync({ episodeId: episode.id, data: episodeData });

      alert("Cập nhật tập phim thành công!");

      if (onUpdate) {
        onUpdate(episodeData);
      }

      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật episode:", error);
      alert("Có lỗi xảy ra khi cập nhật tập phim. Vui lòng thử lại!");
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-xl font-bold mb-4">Chỉnh sửa tập phim</h2>

        {/* Error Display */}
        {updateEpisodeError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline">
              {" "}
              {updateEpisodeError.message}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold mb-1">Tên tập</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-400"
              }`}
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">ID Video</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.url ? "border-red-500" : "border-gray-400"
              }`}
              value={formData.url}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, url: e.target.value }))
              }
            />
            {errors.url && (
              <p className="text-red-500 text-sm mt-1">{errors.url}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Thời lượng
            </label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${
                errors.duration ? "border-red-500" : "border-gray-400"
              }`}
              value={formData.duration}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, duration: e.target.value }))
              }
              placeholder="VD: 45 phút, 1h 30m"
            />
            {errors.duration && (
              <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Mô tả</label>
            <textarea
              className="w-full border border-gray-400 rounded px-3 py-2"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Mô tả tập phim..."
            />
          </div>
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={onClose}
              disabled={isUpdatingEpisode}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              disabled={isUpdatingEpisode}
            >
              {isUpdatingEpisode ? "Đang cập nhật..." : "Cập nhật"}
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

export default EditEpisodeModal;
