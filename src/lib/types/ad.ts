export interface Ad {
  id: string;
  name: string;
  type: AdType;
  status: AdStatus;
  placement: AdPlacement;
  imageUrl?: string;
  script?: string;
  targetUrl?: string;
  startDate?: Date;
  endDate?: Date;
  clickCount: number;
  viewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export type AdType = 'banner' | 'popup' | 'video' | 'script';

export type AdStatus = 'active' | 'inactive' | 'scheduled' | 'expired';

export type AdPlacement = 'home_page' | 'watch_page' | 'ads_page' | 'sidebar' | 'popup_pause';

export const AD_TYPES: { label: string; value: AdType }[] = [
  { label: 'Banner', value: 'banner' },
  { label: 'Popup', value: 'popup' },
  { label: 'Video', value: 'video' },
  { label: 'Script', value: 'script' }
];

export const AD_STATUSES: { label: string; value: AdStatus }[] = [
  { label: 'Hoạt động', value: 'active' },
  { label: 'Tạm dừng', value: 'inactive' },
  { label: 'Đã lên lịch', value: 'scheduled' },
  { label: 'Hết hạn', value: 'expired' }
];

export const AD_PLACEMENTS: { label: string; value: AdPlacement }[] = [
  { label: 'Trang chủ', value: 'home_page' },
  { label: 'Trang xem phim', value: 'watch_page' },
  { label: 'Trang quảng cáo', value: 'ads_page' },
  { label: 'Thanh bên', value: 'sidebar' },
  { label: 'Popup khi tạm dừng', value: 'popup_pause' }
];

export interface CreateAdRequest {
  name: string;
  type: AdType;
  placement: AdPlacement;
  imageUrl?: string;
  script?: string;
  targetUrl?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface UpdateAdRequest extends Partial<CreateAdRequest> {
  id: string;
  status?: AdStatus;
}
