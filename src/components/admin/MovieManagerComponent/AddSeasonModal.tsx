import React, { useState, useEffect } from "react";
import type { Season } from "@/lib/types/Season";

interface Props {
  movieId: string;
  existingSeasons: Season[];
  onClose: () => void;
  onAdd: (seasonData: {
    title: string;
    seasonNumber?: number;
    description: string;
    releaseDate: string;
    seasonType: "regular" | "special" | "movie" | "ova" | "extra";
    isMainSeries: boolean;
  }) => void;
}

const SEASON_TYPES = [
  {
    value: "regular",
    label: "Mùa chính",
    description: "Mùa phim chính của series",
  },
  { value: "special", label: "Đặc biệt", description: "Tập đặc biệt, OVA" },
  {
    value: "movie",
    label: "Phim điện ảnh",
    description: "Phim lẻ trong series",
  },
  { value: "ova", label: "OVA/OAD", description: "Original Video Animation" },
  {
    value: "extra",
    label: "Ngoại truyện",
    description: "Spin-off, prequel, sequel",
  },
];

const AddSeasonModal: React.FC<Props> = ({
  movieId: _movieId, // Will be used for API calls when adding seasons
  existingSeasons,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    seasonNumber: "",
    description: "",
    releaseDate: "",
    seasonType: "regular" as const,
    isMainSeries: true,
    customTitle: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Tính toán season number tiếp theo
  const getNextSeasonNumber = () => {
    const regularSeasons = existingSeasons.filter(
      (s) => s.title.includes("Season") || s.title.includes("Mùa")
    );

    if (regularSeasons.length === 0) return 1;

    const maxSeason = Math.max(
      ...regularSeasons.map((s) => {
        const match = s.title.match(/(\d+)/);
        return match ? parseInt(match[1]) : 0;
      })
    );

    return maxSeason + 1;
  };

  // Tự động generate title khi thay đổi type hoặc number
  useEffect(() => {
    if (formData.seasonType === "regular" && formData.seasonNumber) {
      setFormData((prev) => ({
        ...prev,
        title: `Season ${formData.seasonNumber}`,
      }));
    } else if (formData.seasonType !== "regular") {
      setFormData((prev) => ({
        ...prev,
        title:
          formData.customTitle ||
          SEASON_TYPES.find((t) => t.value === formData.seasonType)?.label ||
          "",
      }));
    }
  }, [formData.seasonType, formData.seasonNumber, formData.customTitle]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Tên mùa phim là bắt buộc";
    }

    // Validate season number cho regular season
    if (formData.seasonType === "regular") {
      if (!formData.seasonNumber) {
        newErrors.seasonNumber = "Số mùa là bắt buộc cho mùa chính";
      } else {
        const seasonNum = parseInt(formData.seasonNumber);

        // Check if season already exists
        const existingRegularSeasons = existingSeasons.filter(
          (s) => s.title.includes("Season") || s.title.includes("Mùa")
        );
        const existingNumbers = existingRegularSeasons.map((s) => {
          const match = s.title.match(/(\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        if (existingNumbers.includes(seasonNum)) {
          newErrors.seasonNumber = `Mùa ${seasonNum} đã tồn tại`;
        }

        // Check if season number is logical (không được nhảy quá xa)
        const maxExisting = Math.max(...existingNumbers, 0);
        if (seasonNum > maxExisting + 1 && maxExisting > 0) {
          newErrors.seasonNumber = `Không thể thêm mùa ${seasonNum} khi chỉ có ${maxExisting} mùa. Hãy thêm mùa ${
            maxExisting + 1
          } trước.`;
        }

        if (seasonNum < 1) {
          newErrors.seasonNumber = "Số mùa phải lớn hơn 0";
        }
      }
    }

    // Validate duplicate titles
    if (
      existingSeasons.some(
        (s) => s.title.toLowerCase() === formData.title.toLowerCase()
      )
    ) {
      newErrors.title = "Tên mùa phim đã tồn tại";
    }

    // Validate release date
    if (!formData.releaseDate) {
      newErrors.releaseDate = "Ngày phát hành là bắt buộc";
    } else {
      const releaseDate = new Date(formData.releaseDate);
      const today = new Date();
      if (releaseDate > today) {
        // Warn but don't error for future dates
        setSuggestions((prev) => [
          ...prev,
          "Ngày phát hành trong tương lai - đảm bảo đây là đúng ý định của bạn",
        ]);
      }
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Mô tả mùa phim là bắt buộc";
    } else if (formData.description.length < 10) {
      newErrors.description = "Mô tả phải có ít nhất 10 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const seasonData = {
      title: formData.title,
      seasonNumber:
        formData.seasonType === "regular"
          ? parseInt(formData.seasonNumber)
          : undefined,
      description: formData.description,
      releaseDate: formData.releaseDate,
      seasonType: formData.seasonType,
      isMainSeries: formData.isMainSeries,
    };

    onAdd(seasonData);
  };

  const handleSeasonTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      seasonType: type as any,
      isMainSeries: type === "regular",
      seasonNumber: type === "regular" ? getNextSeasonNumber().toString() : "",
      customTitle: "",
    }));
    setErrors({});
    setSuggestions([]);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Thêm mùa phim mới
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Season Type Selection */}
          <div>
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Loại mùa phim
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {SEASON_TYPES.map((type) => (
                <div
                  key={type.value}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    formData.seasonType === type.value
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleSeasonTypeChange(type.value)}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="seasonType"
                      value={type.value}
                      checked={formData.seasonType === type.value}
                      onChange={() => handleSeasonTypeChange(type.value)}
                      className="w-4 h-4 text-indigo-600"
                    />
                    <div>
                      <div className="font-medium text-gray-800">
                        {type.label}
                      </div>
                      <div className="text-sm text-gray-500">
                        {type.description}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Season Number (only for regular seasons) */}
          {formData.seasonType === "regular" && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Số mùa
              </label>
              <input
                type="number"
                min={1}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  errors.seasonNumber ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.seasonNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seasonNumber: e.target.value,
                  }))
                }
                placeholder={`Đề xuất: ${getNextSeasonNumber()}`}
              />
              {errors.seasonNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.seasonNumber}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                Mùa tiếp theo được đề xuất: {getNextSeasonNumber()}
              </p>
            </div>
          )}

          {/* Custom Title (for non-regular seasons) */}
          {formData.seasonType !== "regular" && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Tên tùy chỉnh
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.customTitle}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customTitle: e.target.value,
                  }))
                }
                placeholder="VD: Movie: Mugen Train, OVA: The Final Act"
              />
              <p className="text-gray-500 text-sm mt-1">
                Để trống để sử dụng tên mặc định: "
                {
                  SEASON_TYPES.find((t) => t.value === formData.seasonType)
                    ?.label
                }
                "
              </p>
            </div>
          )}

          {/* Generated Title Preview */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tên mùa phim (preview)
            </label>
            <div
              className={`w-full border rounded-lg px-4 py-3 bg-gray-50 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            >
              {formData.title || "Chưa có tên..."}
            </div>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Mô tả mùa phim
            </label>
            <textarea
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
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
              placeholder="Mô tả nội dung, cốt truyện của mùa phim này..."
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
              Ngày phát hành
            </label>
            <input
              type="date"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.releaseDate ? "border-red-500" : "border-gray-300"
              }`}
              value={formData.releaseDate}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  releaseDate: e.target.value,
                }))
              }
            />
            {errors.releaseDate && (
              <p className="text-red-500 text-sm mt-1">{errors.releaseDate}</p>
            )}
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-medium text-yellow-800 mb-2">Ghi chú:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                {suggestions.map((suggestion, idx) => (
                  <li key={idx}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Existing Seasons Info */}
          {existingSeasons.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">
                Mùa phim hiện có:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                {existingSeasons.map((season, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{season.title}</span>
                    <span className="text-gray-400">
                      {new Date(season.releaseDate).getFullYear()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onClose}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Thêm mùa phim
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

export default AddSeasonModal;
