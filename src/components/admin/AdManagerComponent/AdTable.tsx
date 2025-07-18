import React from 'react';
import { FaEdit, FaTrash, FaEye, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import { MdOpenInNew } from 'react-icons/md';
import type { Ad } from '@/lib/types/ad';
import { AD_TYPES, AD_STATUSES, AD_PLACEMENTS } from '@/lib/types/ad';

interface AdTableProps {
  ads: Ad[];
  loading?: boolean;
  onEdit: (ad: Ad) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onViewStats: (ad: Ad) => void;
}

const AdTable: React.FC<AdTableProps> = ({
  ads,
  loading = false,
  onEdit,
  onDelete,
  onToggleStatus,
  onViewStats
}) => {
  const getTypeLabel = (type: string) => {
    return AD_TYPES.find(t => t.value === type)?.label || type;
  };

  const getStatusLabel = (status: string) => {
    return AD_STATUSES.find(s => s.value === status)?.label || status;
  };

  const getPlacementLabel = (placement: string) => {
    return AD_PLACEMENTS.find(p => p.value === placement)?.label || placement;
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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-12 text-center">
          <div className="text-gray-400 text-4xl mb-4">📢</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Chưa có quảng cáo nào
          </h3>
          <p className="text-gray-500">
            Hãy tạo quảng cáo đầu tiên của bạn
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quảng cáo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Loại
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vị trí
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thống kê
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cập nhật
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ads.map((ad) => (
              <tr key={ad.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {ad.imageUrl && (
                      <div className="flex-shrink-0 h-12 w-12 mr-4">
                        <img
                          className="h-12 w-12 rounded-lg object-cover"
                          src={ad.imageUrl}
                          alt={ad.name}
                        />
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                        {ad.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        ID: {ad.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {getTypeLabel(ad.type)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getPlacementLabel(ad.placement)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
                    {getStatusLabel(ad.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="space-y-1">
                    <div>👁 {ad.viewCount.toLocaleString()} lượt xem</div>
                    <div>👆 {ad.clickCount.toLocaleString()} click</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(ad.updatedAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewStats(ad)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Xem thống kê"
                    >
                      <FaEye />
                    </button>

                    <button
                      onClick={() => onToggleStatus(ad.id)}
                      className={`p-1 rounded transition-colors ${ad.status === 'active'
                        ? 'text-green-600 hover:text-green-900 hover:bg-green-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      title={ad.status === 'active' ? 'Tắt quảng cáo' : 'Bật quảng cáo'}
                    >
                      {ad.status === 'active' ? <FaToggleOn size={18} /> : <FaToggleOff size={18} />}
                    </button>

                    <button
                      onClick={() => onEdit(ad)}
                      className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50 transition-colors"
                      title="Chỉnh sửa"
                    >
                      <FaEdit />
                    </button>

                    {ad.targetUrl && (
                      <a
                        href={ad.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-colors"
                        title="Mở liên kết"
                      >
                        <MdOpenInNew />
                      </a>
                    )}

                    <button
                      onClick={() => onDelete(ad.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Xóa quảng cáo"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdTable;
