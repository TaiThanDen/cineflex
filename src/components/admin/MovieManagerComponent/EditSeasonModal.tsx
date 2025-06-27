import React, { useState, useEffect } from "react";
import type { Season } from "@/lib/types/Season";

interface Props {
  season: Season;
  onClose: () => void;
  onUpdate: (seasonData: {
    title: string;
    description: string;
    releaseDate: string;
    seasonNumber?: number;
    seasonType?: "regular" | "special" | "movie" | "ova" | "extra";
    isMainSeries?: boolean;
  }) => void;
  isLoading?: boolean;
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

const EditSeasonModal: React.FC<Props> = ({
  season,
  onClose,
  onUpdate,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: season.title || "",
    description: season.description || "",
    releaseDate: season.releaseDate
      ? new Date(season.releaseDate).toISOString().split("T")[0]
      : "",
    seasonNumber: "",
    seasonType: "regular" as const,
    isMainSeries: true,
    customTitle: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form data from season
  useEffect(() => {
    // Detect season type from title
    let detectedType = "regular";
    let seasonNumber = "";

    if (season.title) {
      if (
        season.title.toLowerCase().includes("movie") ||
        season.title.toLowerCase().includes("phim")
      ) {
        detectedType = "movie";
      } else if (season.title.toLowerCase().includes("ova")) {
        detectedType = "ova";
      } else if (
        season.title.toLowerCase().includes("special") ||
        season.title.toLowerCase().includes("đặc biệt")
      ) {
        detectedType = "special";
      } else if (
        season.title.toLowerCase().includes("extra") ||
        season.title.toLowerCase().includes("ngoại truyện")
      ) {
        detectedType = "extra";
      } else {
        // Try to extract season number
        const match = season.title.match(/(\d+)/);
        if (match) {
          seasonNumber = match[1];
        }
      }
    }

    setFormData({
      title: season.title || "",
      description: season.description || "",
      releaseDate: season.releaseDate
        ? new Date(season.releaseDate).toISOString().split("T")[0]
        : "",
      seasonNumber,
      seasonType: detectedType as any,
      isMainSeries: detectedType === "regular",
      customTitle: detectedType !== "regular" ? season.title : "",
    });
  }, [season]);

  // Auto generate title based on type and number
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

    // Validate season number for regular season
    if (formData.seasonType === "regular") {
      if (!formData.seasonNumber) {
        newErrors.seasonNumber = "Số mùa là bắt buộc cho mùa chính";
      } else {
        const seasonNum = parseInt(formData.seasonNumber);
        if (seasonNum < 1) {
          newErrors.seasonNumber = "Số mùa phải lớn hơn 0";
        }
      }
    }

    // Validate release date
    if (!formData.releaseDate) {
      newErrors.releaseDate = "Ngày phát hành là bắt buộc";
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

    onUpdate(seasonData);
  };

  const handleSeasonTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      seasonType: type as any,
      isMainSeries: type === "regular",
      seasonNumber: type === "regular" ? prev.seasonNumber || "1" : "",
      customTitle: type !== "regular" ? prev.title : "",
    }));
    setErrors({});
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-40"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl relative z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Chỉnh sửa mùa phim
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
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${formData.seasonType === type.value
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
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.seasonNumber ? "border-red-500" : "border-gray-300"
                  }`}
                value={formData.seasonNumber}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    seasonNumber: e.target.value,
                  }))
                }
                placeholder="Nhập số mùa"
              />
              {errors.seasonNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.seasonNumber}
                </p>
              )}
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
              className={`w-full border rounded-lg px-4 py-3 bg-gray-50 ${errors.title ? "border-red-500" : "border-gray-300"
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
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.description ? "border-red-500" : "border-gray-300"
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
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.releaseDate ? "border-red-500" : "border-gray-300"
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

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              onClick={onClose}
              disabled={isLoading}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Đang cập nhật..." : "Cập nhật mùa phim"}
            </button>
          </div>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold"
          disabled={isLoading}
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default EditSeasonModal;
