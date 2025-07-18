import React, { useState, useEffect } from 'react';
import { FaPlus, FaSearch, FaFilter } from 'react-icons/fa';
import AdTable from '../../components/admin/AdManagerComponent/AdTable';
import AdForm from '../../components/admin/AdManagerComponent/AdForm';
import AdStats from '../../components/admin/AdManagerComponent/AdStats';
import ConfirmDelete from '../../components/admin/AdManagerComponent/ConfirmDelete';
import { adApi } from '@/lib/api/adApi';
import type { Ad, CreateAdRequest, UpdateAdRequest, AdStatus, AdPlacement } from '@/lib/types/ad';
import { AD_STATUSES, AD_PLACEMENTS } from '@/lib/types/ad';

const AdManager: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Stats modal
  const [showStats, setShowStats] = useState(false);
  const [statsAd, setStatsAd] = useState<Ad | null>(null);

  // Delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingAdId, setDeletingAdId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<AdStatus | 'all'>('all');
  const [placementFilter, setPlacementFilter] = useState<AdPlacement | 'all'>('all');

  // Load ads on component mount
  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adApi.getAllAds();
      setAds(data);
    } catch (err) {
      setError('Không thể tải danh sách quảng cáo');
      console.error('Error loading ads:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter ads based on search and filters
  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ad.status === statusFilter;
    const matchesPlacement = placementFilter === 'all' || ad.placement === placementFilter;

    return matchesSearch && matchesStatus && matchesPlacement;
  });

  // Form handlers
  const handleCreateAd = () => {
    setEditingAd(null);
    setShowForm(true);
  };

  const handleEditAd = (ad: Ad) => {
    setEditingAd(ad);
    setShowForm(true);
  };

  const handleSubmitForm = async (data: CreateAdRequest | UpdateAdRequest) => {
    try {
      setFormLoading(true);

      if ('id' in data) {
        // Update existing ad
        const updatedAd = await adApi.updateAd(data);
        setAds(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
      } else {
        // Create new ad
        const newAd = await adApi.createAd(data);
        setAds(prev => [newAd, ...prev]);
      }

      setShowForm(false);
      setEditingAd(null);
    } catch (err) {
      console.error('Error submitting form:', err);
      throw err; // Re-throw to let form handle the error
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteAd = async (id: string) => {
    setDeletingAdId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deletingAdId) return;

    try {
      setDeleteLoading(true);
      await adApi.deleteAd(deletingAdId);
      setAds(prev => prev.filter(ad => ad.id !== deletingAdId));
      setShowDeleteConfirm(false);
      setDeletingAdId(null);
    } catch (err) {
      console.error('Error deleting ad:', err);
      alert('Không thể xóa quảng cáo');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleStatus = async (id: string) => {
    try {
      const updatedAd = await adApi.toggleAdStatus(id);
      setAds(prev => prev.map(ad => ad.id === updatedAd.id ? updatedAd : ad));
    } catch (err) {
      console.error('Error toggling ad status:', err);
      alert('Không thể thay đổi trạng thái quảng cáo');
    }
  };

  const handleViewStats = (ad: Ad) => {
    setStatsAd(ad);
    setShowStats(true);
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPlacementFilter('all');
  };

  const hasActiveFilters = searchTerm || statusFilter !== 'all' || placementFilter !== 'all';

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-400 text-4xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-red-800 mb-2">Lỗi tải dữ liệu</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadAds}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý Quảng cáo</h1>
          <p className="text-gray-600 mt-1">
            Quản lý và theo dõi hiệu suất các quảng cáo trên hệ thống
          </p>
        </div>
        <button
          onClick={handleCreateAd}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          <FaPlus />
          Thêm quảng cáo
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng quảng cáo</p>
              <p className="text-2xl font-semibold text-gray-900">{ads.length}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-blue-600 text-xl">📢</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Đang hoạt động</p>
              <p className="text-2xl font-semibold text-green-600">
                {ads.filter(ad => ad.status === 'active').length}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng lượt xem</p>
              <p className="text-2xl font-semibold text-blue-600">
                {ads.reduce((sum, ad) => sum + ad.viewCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-blue-600 text-xl">👁️</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Tổng lượt click</p>
              <p className="text-2xl font-semibold text-purple-600">
                {ads.reduce((sum, ad) => sum + ad.clickCount, 0).toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-purple-600 text-xl">👆</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as AdStatus | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            >
              <option value="all">Tất cả trạng thái</option>
              {AD_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Placement Filter */}
          <div>
            <select
              value={placementFilter}
              onChange={(e) => setPlacementFilter(e.target.value as AdPlacement | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            >
              <option value="all">Tất cả vị trí</option>
              {AD_PLACEMENTS.map(placement => (
                <option key={placement.value} value={placement.value}>
                  {placement.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Xóa bộ lọc
            </button>
          )}
        </div>

        {/* Filter Results Info */}
        {hasActiveFilters && (
          <div className="mt-3 text-sm text-gray-600">
            Hiển thị {filteredAds.length} / {ads.length} quảng cáo
          </div>
        )}
      </div>

      {/* Table */}
      <AdTable
        ads={filteredAds}
        loading={loading}
        onEdit={handleEditAd}
        onDelete={handleDeleteAd}
        onToggleStatus={handleToggleStatus}
        onViewStats={handleViewStats}
      />

      {/* Modals */}
      <AdForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingAd(null);
        }}
        onSubmit={handleSubmitForm}
        editingAd={editingAd}
        loading={formLoading}
      />

      <AdStats
        isOpen={showStats}
        onClose={() => {
          setShowStats(false);
          setStatsAd(null);
        }}
        ad={statsAd}
      />

      <ConfirmDelete
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeletingAdId(null);
        }}
        onConfirm={confirmDelete}
        title="Xóa quảng cáo"
        message="Bạn có chắc chắn muốn xóa quảng cáo này? Hành động này không thể hoàn tác."
        loading={deleteLoading}
      />
    </div>
  );
};

export default AdManager;
