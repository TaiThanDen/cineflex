import React from 'react';
import { FaTimes, FaEye, FaMousePointer, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import type { Ad } from '@/lib/types/ad';
import { AD_TYPES, AD_PLACEMENTS } from '@/lib/types/ad';

interface AdStatsProps {
  isOpen: boolean;
  onClose: () => void;
  ad: Ad | null;
}

const AdStats: React.FC<AdStatsProps> = ({ isOpen, onClose, ad }) => {
  if (!isOpen || !ad) return null;

  const getTypeLabel = (type: string) => {
    return AD_TYPES.find(t => t.value === type)?.label || type;
  };

  const getPlacementLabel = (placement: string) => {
    return AD_PLACEMENTS.find(p => p.value === placement)?.label || placement;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  const calculateCTR = (): number => {
    if (ad.viewCount === 0) return 0;
    return Number(((ad.clickCount / ad.viewCount) * 100).toFixed(2));
  };

  const getPerformanceColor = () => {
    const ctr = calculateCTR();
    if (ctr >= 2) return 'text-green-600';
    if (ctr >= 1) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="text-white">
            <h2 className="text-xl font-semibold">Thống kê quảng cáo</h2>
            <p className="text-indigo-100 text-sm mt-1">Chi tiết hiệu suất và dữ liệu</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* Ad Info */}
          <div className="mb-8">
            <div className="flex items-start gap-4">
              {ad.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={ad.imageUrl}
                    alt={ad.name}
                    className="w-32 h-24 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{ad.name}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {getTypeLabel(ad.type)}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                    {ad.status}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {getPlacementLabel(ad.placement)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>Tạo: {formatDate(ad.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt />
                    <span>Cập nhật: {formatDate(ad.updatedAt)}</span>
                  </div>
                  {ad.targetUrl && (
                    <div className="flex items-center gap-2">
                      <span>🔗</span>
                      <a
                        href={ad.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 truncate max-w-md"
                      >
                        {ad.targetUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Lượt xem</p>
                  <p className="text-2xl font-semibold text-blue-900">
                    {ad.viewCount.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-500 rounded-full">
                  <FaEye className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Lượt click</p>
                  <p className="text-2xl font-semibold text-green-900">
                    {ad.clickCount.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-500 rounded-full">
                  <FaMousePointer className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">CTR</p>
                  <p className={`text-2xl font-semibold ${getPerformanceColor()}`}>
                    {calculateCTR().toFixed(2)}%
                  </p>
                </div>
                <div className="p-3 bg-purple-500 rounded-full">
                  <FaChartLine className="text-white" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Hiệu suất</p>
                  <p className={`text-lg font-semibold ${getPerformanceColor()}`}>
                    {calculateCTR() >= 2 ? 'Tốt' :
                      calculateCTR() >= 1 ? 'Trung bình' : 'Cần cải thiện'}
                  </p>
                </div>
                <div className="p-3 bg-orange-500 rounded-full">
                  <span className="text-white text-xl">📊</span>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">Phân tích hiệu suất</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Tỷ lệ click-through (CTR):</strong> {calculateCTR().toFixed(2)}%
                    {calculateCTR() >= 2 ? ' - Tuyệt vời! CTR cao cho thấy quảng cáo rất hấp dẫn.' :
                      calculateCTR() >= 1 ? ' - Khá tốt, có thể cải thiện thêm.' :
                        ' - Cần tối ưu hóa nội dung và vị trí đặt quảng cáo.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Engagement:</strong> {ad.viewCount > 1000 ? 'Cao' : ad.viewCount > 500 ? 'Trung bình' : 'Thấp'}
                    {ad.viewCount > 1000 ? ' - Quảng cáo được nhiều người xem.' :
                      ad.viewCount > 500 ? ' - Có thể tăng cường marketing.' :
                        ' - Cần điều chỉnh chiến lược quảng cáo.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Vị trí:</strong> {getPlacementLabel(ad.placement)} -
                    {ad.placement === 'home_page' ? ' Vị trí tốt cho tăng độ nhận diện thương hiệu.' :
                      ad.placement === 'watch_page' ? ' Vị trí tuyệt vời cho tương tác cao.' :
                        ad.placement === 'popup_pause' ? ' Vị trí hiệu quả cho conversion.' :
                          ' Vị trí phù hợp cho mục tiêu cụ thể.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                // Có thể thêm logic export report
                console.log('Export report for ad:', ad.id);
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Xuất báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdStats;
