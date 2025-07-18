import type { Ad, CreateAdRequest, UpdateAdRequest } from '@/lib/types/ad';

// Mock data cho quảng cáo
const mockAds: Ad[] = [
  {
    id: '1',
    name: 'Banner Trang Chủ - Action Movies',
    type: 'banner',
    status: 'active',
    placement: 'home_page',
    imageUrl: 'https://collider.com/wp-content/uploads/the-avengers-movie-poster-banners-04.jpg',
    targetUrl: 'https://example.com/action-movies',
    clickCount: 1250,
    viewCount: 15000,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-15')
  },
  {
    id: '2',
    name: 'Popup Quảng Cáo Netflix',
    type: 'popup',
    status: 'active',
    placement: 'popup_pause',
    imageUrl: 'https://static.nutscdn.com/vimg/0-0/784543799c537bda4c8f8b9c1757bfc3.jpg',
    targetUrl: 'https://netflix.com',
    clickCount: 850,
    viewCount: 8500,
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-01-20')
  },
  {
    id: '3',
    name: 'Banner Sidebar - Polar Movie',
    type: 'banner',
    status: 'inactive',
    placement: 'sidebar',
    imageUrl: 'https://i0.wp.com/teaser-trailer.com/wp-content/uploads/2019/01/Polar-new-banner.jpg?ssl=1',
    targetUrl: 'https://example.com/polar',
    clickCount: 420,
    viewCount: 5200,
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2025-01-05')
  },
  {
    id: '4',
    name: 'Script Quảng Cáo Google Ads',
    type: 'script',
    status: 'active',
    placement: 'ads_page',
    script: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>',
    clickCount: 0,
    viewCount: 12000,
    createdAt: new Date('2025-01-05'),
    updatedAt: new Date('2025-01-22')
  },
  {
    id: '5',
    name: 'Banner Trang Xem Phim',
    type: 'banner',
    status: 'scheduled',
    placement: 'watch_page',
    imageUrl: 'https://samfillingham.com/wp-content/uploads/2020/05/2200-1000px-banner-Muna-1310x595.jpg',
    targetUrl: 'https://example.com/muna',
    startDate: new Date('2025-02-01'),
    endDate: new Date('2025-02-28'),
    clickCount: 0,
    viewCount: 0,
    createdAt: new Date('2025-01-25'),
    updatedAt: new Date('2025-01-25')
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adApi = {
  // Lấy tất cả quảng cáo
  async getAllAds(): Promise<Ad[]> {
    await delay(500);
    return [...mockAds];
  },

  // Lấy quảng cáo theo ID
  async getAdById(id: string): Promise<Ad | null> {
    await delay(300);
    return mockAds.find(ad => ad.id === id) || null;
  },

  // Tạo quảng cáo mới
  async createAd(data: CreateAdRequest): Promise<Ad> {
    await delay(800);
    const newAd: Ad = {
      id: (mockAds.length + 1).toString(),
      ...data,
      status: 'inactive',
      clickCount: 0,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockAds.push(newAd);
    return newAd;
  },

  // Cập nhật quảng cáo
  async updateAd(data: UpdateAdRequest): Promise<Ad> {
    await delay(600);
    const index = mockAds.findIndex(ad => ad.id === data.id);
    if (index === -1) {
      throw new Error('Không tìm thấy quảng cáo');
    }
    
    mockAds[index] = {
      ...mockAds[index],
      ...data,
      updatedAt: new Date()
    };
    return mockAds[index];
  },

  // Xóa quảng cáo
  async deleteAd(id: string): Promise<boolean> {
    await delay(400);
    const index = mockAds.findIndex(ad => ad.id === id);
    if (index === -1) {
      throw new Error('Không tìm thấy quảng cáo');
    }
    
    mockAds.splice(index, 1);
    return true;
  },

  // Thay đổi trạng thái quảng cáo
  async toggleAdStatus(id: string): Promise<Ad> {
    await delay(300);
    const ad = mockAds.find(ad => ad.id === id);
    if (!ad) {
      throw new Error('Không tìm thấy quảng cáo');
    }
    
    ad.status = ad.status === 'active' ? 'inactive' : 'active';
    ad.updatedAt = new Date();
    return ad;
  }
};
