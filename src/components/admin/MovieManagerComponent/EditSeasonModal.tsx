import React from "react";
import type { Season } from "@/lib/types/Season";

interface Props {
  season: Season;
  onClose: () => void;
}

const SEASON_TYPES = [
  { value: "regular", label: "Mùa chính", description: "Mùa phim chính của series" },
  { value: "special", label: "Đặc biệt", description: "Tập đặc biệt, OVA" },
  { value: "movie", label: "Phim điện ảnh", description: "Phim lẻ trong series" },
  { value: "ova", label: "OVA/OAD", description: "Original Video Animation" },
  { value: "extra", label: "Ngoại truyện", description: "Spin-off, prequel, sequel" },
];

const EditSeasonModal: React.FC<Props> = ({ season, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Chỉnh sửa mùa phim</h2>

        <form className="space-y-6">
          {/* Season Type */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Loại mùa phim
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SEASON_TYPES.map((type) => (
                <div
                  key={type.value}
                  className={`border-2 rounded-lg p-4 ${season.title.toLowerCase().includes(type.value) ? "border-indigo-500 bg-indigo-50" : "border-gray-200"
                    }`}
                >
                  <div className="font-medium text-gray-800">{type.label}</div>
                  <div className="text-sm text-gray-500">{type.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Season Number (read-only) */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Số mùa (nếu có)
            </label>
            <input
              type="number"
              value={season.title.match(/\d+/)?.[0] || ""}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tên mùa phim
            </label>
            <input
              type="text"
              disabled
              value={season.title}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Mô tả mùa phim
            </label>
            <textarea
              rows={4}
              disabled
              value={season.description}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Ngày phát hành
            </label>
            <input
              type="date"
              disabled
              value={
                season.releaseDate
                  ? new Date(season.releaseDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Đóng
            </button>
          </div>
        </form>

        {/* Close Icon */}
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

export default EditSeasonModal;
