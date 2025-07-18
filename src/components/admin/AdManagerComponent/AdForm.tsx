import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave, FaImage, FaCode, FaLink } from 'react-icons/fa';
import type { Ad, CreateAdRequest, UpdateAdRequest, AdType, AdPlacement } from '@/lib/types/ad';
import { AD_TYPES, AD_PLACEMENTS } from '@/lib/types/ad';

interface AdFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAdRequest | UpdateAdRequest) => Promise<void>;
  editingAd?: Ad | null;
  loading?: boolean;
}

const AdForm: React.FC<AdFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingAd,
  loading = false
}) => {
  const [formData, setFormData] = useState<CreateAdRequest>({
    name: '',
    type: 'banner',
    placement: 'home_page',
    imageUrl: '',
    script: '',
    targetUrl: '',
    startDate: undefined,
    endDate: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form khi mở/đóng modal hoặc thay đổi editingAd
  useEffect(() => {
    if (isOpen) {
      if (editingAd) {
        setFormData({
          name: editingAd.name,
          type: editingAd.type,
          placement: editingAd.placement,
          imageUrl: editingAd.imageUrl || '',
          script: editingAd.script || '',
          targetUrl: editingAd.targetUrl || '',
          startDate: editingAd.startDate,
          endDate: editingAd.endDate
        });
      } else {
        setFormData({
          name: '',
          type: 'banner',
          placement: 'home_page',
          imageUrl: '',
          script: '',
          targetUrl: '',
          startDate: undefined,
          endDate: undefined
        });
      }
      setErrors({});
    }
  }, [isOpen, editingAd]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Tên quảng cáo là bắt buộc';
    }

    if (formData.type === 'banner' && !formData.imageUrl?.trim()) {
      newErrors.imageUrl = 'URL hình ảnh là bắt buộc cho quảng cáo banner';
    }

    if (formData.type === 'script' && !formData.script?.trim()) {
      newErrors.script = 'Mã script là bắt buộc cho quảng cáo script';
    }

    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'URL hình ảnh không hợp lệ';
    }

    if (formData.targetUrl && !isValidUrl(formData.targetUrl)) {
      newErrors.targetUrl = 'URL đích không hợp lệ';
    }

    if (formData.startDate && formData.endDate && new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const submitData = editingAd
        ? { ...formData, id: editingAd.id } as UpdateAdRequest
        : formData;

      await onSubmit(submitData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleInputChange = (field: keyof CreateAdRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingAd ? 'Chỉnh sửa quảng cáo' : 'Thêm quảng cáo mới'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Tên quảng cáo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên quảng cáo *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="Nhập tên quảng cáo..."
                disabled={loading}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Loại quảng cáo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loại quảng cáo *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as AdType)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  disabled={loading}
                >
                  {AD_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Vị trí đặt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vị trí đặt *
                </label>
                <select
                  value={formData.placement}
                  onChange={(e) => handleInputChange('placement', e.target.value as AdPlacement)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  disabled={loading}
                >
                  {AD_PLACEMENTS.map(placement => (
                    <option key={placement.value} value={placement.value}>
                      {placement.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* URL hình ảnh (cho banner, popup) */}
            {(formData.type === 'banner' || formData.type === 'popup') && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaImage /> URL hình ảnh {formData.type === 'banner' && '*'}
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="https://example.com/image.jpg"
                  disabled={loading}
                />
                {errors.imageUrl && <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>}
                {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="max-w-full h-32 object-cover rounded border"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Script code (cho script ads) */}
            {formData.type === 'script' && (
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <FaCode /> Mã script *
                </label>
                <textarea
                  value={formData.script}
                  onChange={(e) => handleInputChange('script', e.target.value)}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors font-mono text-sm ${errors.script ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder="<script>...</script>"
                  disabled={loading}
                />
                {errors.script && <p className="mt-1 text-sm text-red-600">{errors.script}</p>}
              </div>
            )}

            {/* URL đích */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <FaLink /> URL đích
              </label>
              <input
                type="url"
                value={formData.targetUrl}
                onChange={(e) => handleInputChange('targetUrl', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${errors.targetUrl ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="https://example.com"
                disabled={loading}
              />
              {errors.targetUrl && <p className="mt-1 text-sm text-red-600">{errors.targetUrl}</p>}
              <p className="mt-1 text-sm text-gray-500">
                URL sẽ được mở khi người dùng click vào quảng cáo
              </p>
            </div>

            {/* Thời gian hiển thị */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày bắt đầu
                </label>
                <input
                  type="datetime-local"
                  value={formData.startDate ? new Date(formData.startDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value ? new Date(e.target.value) : undefined)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày kết thúc
                </label>
                <input
                  type="datetime-local"
                  value={formData.endDate ? new Date(formData.endDate).toISOString().slice(0, 16) : ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value ? new Date(e.target.value) : undefined)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  disabled={loading}
                />
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            disabled={loading}
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Đang lưu...
              </>
            ) : (
              <>
                <FaSave />
                {editingAd ? 'Cập nhật' : 'Thêm mới'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdForm;
