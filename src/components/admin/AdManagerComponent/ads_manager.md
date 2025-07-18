# Ad Management System

Hệ thống quản lý quảng cáo hoàn chỉnh cho CineFlex với các tính năng:

## Cấu trúc Component

```
AdManagerComponent/
├── AdManager.tsx          # Component chính quản lý state và logic
├── AdTable.tsx           # Bảng hiển thị danh sách quảng cáo
├── AdForm.tsx            # Form thêm/sửa quảng cáo
├── AdStats.tsx           # Modal hiển thị thống kê chi tiết
└── ConfirmDelete.tsx     # Modal xác nhận xóa
```

## Types và API

```
lib/
├── types/ad.ts          # Type definitions cho quảng cáo
└── api/adApi.ts         # Mock API cho CRUD operations
```

## Tính năng

- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Tìm kiếm và lọc theo nhiều tiêu chí
- ✅ Thống kê và analytics
- ✅ Responsive design
- ✅ Loading states và error handling
- ✅ Confirmation modals
- ✅ Form validation
- ✅ Image preview
- ✅ Script validation

## Cách sử dụng

1. Truy cập `/admin/ads` từ admin panel
2. Sử dụng nút "Thêm quảng cáo" để tạo mới
3. Click các icon trong bảng để edit, xem stats, toggle status, hoặc xóa
4. Sử dụng bộ lọc để tìm kiếm quảng cáo cụ thể

## Loại quảng cáo được hỗ trợ

- **Banner**: Hình ảnh quảng cáo
- **Popup**: Quảng cáo bật lên
- **Video**: Video quảng cáo
- **Script**: Mã HTML/JS (Google Ads, etc.)

## Vị trí hiển thị

- Trang chủ
- Trang xem phim
- Trang quảng cáo
- Thanh bên
- Popup khi tạm dừng video
