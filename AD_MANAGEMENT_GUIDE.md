# Hướng dẫn sử dụng trang Quản lý Quảng cáo

## Tổng quan

Trang quản lý quảng cáo cho phép admin tạo, chỉnh sửa, xóa và theo dõi hiệu suất các quảng cáo trên hệ thống CineFlex.

## Truy cập trang quản lý

- URL: `/admin/ads`
- Từ sidebar admin: **Manage Ads**

## Các tính năng chính

### 1. Dashboard thống kê

- **Tổng quảng cáo**: Hiển thị tổng số quảng cáo trong hệ thống
- **Đang hoạt động**: Số lượng quảng cáo đang active
- **Tổng lượt xem**: Tổng số lần quảng cáo được hiển thị
- **Tổng lượt click**: Tổng số click vào quảng cáo

### 2. Bộ lọc và tìm kiếm

- **Tìm kiếm**: Tìm theo tên hoặc ID quảng cáo
- **Lọc theo trạng thái**:
  - Tất cả trạng thái
  - Hoạt động (Active)
  - Tạm dừng (Inactive)
  - Đã lên lịch (Scheduled)
  - Hết hạn (Expired)
- **Lọc theo vị trí**:
  - Trang chủ
  - Trang xem phim
  - Trang quảng cáo
  - Thanh bên
  - Popup khi tạm dừng

### 3. Quản lý quảng cáo

#### Thêm quảng cáo mới

1. Click nút **"Thêm quảng cáo"**
2. Điền thông tin:
   - **Tên quảng cáo**: Tên mô tả cho quảng cáo
   - **Loại quảng cáo**:
     - `Banner`: Quảng cáo hình ảnh
     - `Popup`: Quảng cáo bật lên
     - `Video`: Quảng cáo video
     - `Script`: Mã script quảng cáo (Google Ads, v.v.)
   - **Vị trí đặt**: Chọn vị trí hiển thị quảng cáo
   - **URL hình ảnh**: (Bắt buộc cho Banner) Đường dẫn đến hình ảnh
   - **Mã script**: (Bắt buộc cho Script) Mã HTML/JavaScript
   - **URL đích**: Đường dẫn khi người dùng click vào quảng cáo
   - **Thời gian hiển thị**: Ngày bắt đầu và kết thúc (tùy chọn)

#### Chỉnh sửa quảng cáo

1. Click icon **✏️ Edit** trong bảng
2. Cập nhật thông tin cần thiết
3. Click **"Cập nhật"**

#### Bật/Tắt quảng cáo

- Click icon **🔘 Toggle** để thay đổi trạng thái active/inactive

#### Xem thống kê chi tiết

1. Click icon **👁️ View Stats**
2. Xem thông tin:
   - Lượt xem và click
   - Tỷ lệ click-through (CTR)
   - Phân tích hiệu suất
   - Đánh giá và gợi ý cải thiện

#### Xóa quảng cáo

1. Click icon **🗑️ Delete**
2. Xác nhận xóa trong popup

### 4. Bảng danh sách quảng cáo

Các cột hiển thị:

- **Quảng cáo**: Hình ảnh preview và tên
- **Loại**: Banner, Popup, Video, Script
- **Vị trí**: Vị trí hiển thị quảng cáo
- **Trạng thái**: Active, Inactive, Scheduled, Expired
- **Thống kê**: Lượt xem và click
- **Cập nhật**: Thời gian cập nhật cuối
- **Thao tác**: Các nút chức năng

## Các loại quảng cáo

### 1. Banner

- Hiển thị hình ảnh tĩnh
- Yêu cầu URL hình ảnh
- Thích hợp cho branding

### 2. Popup

- Hiển thị dưới dạng popup
- Có thể có hình ảnh hoặc text
- Thích hợp cho promotion

### 3. Video

- Hiển thị video quảng cáo
- Yêu cầu URL video
- Engagement cao

### 4. Script

- Chèn mã HTML/JavaScript
- Thích hợp cho Google Ads, Facebook Ads
- Linh hoạt nhất

## Vị trí đặt quảng cáo

### 1. Trang chủ (`home_page`)

- Hiển thị trên trang chủ
- Tăng brand awareness
- Traffic cao

### 2. Trang xem phim (`watch_page`)

- Hiển thị khi xem phim
- Engagement cao
- Conversion tốt

### 3. Trang quảng cáo (`ads_page`)

- Trang chuyên dụng cho ads
- Hiển thị nhiều quảng cáo cùng lúc

### 4. Thanh bên (`sidebar`)

- Hiển thị ở sidebar
- Không gây khó chịu
- Phù hợp banner nhỏ

### 5. Popup khi tạm dừng (`popup_pause`)

- Hiển thị khi user pause video
- Conversion rate cao
- Cần cân nhắc UX

## Trạng thái quảng cáo

- **Active**: Đang hiển thị
- **Inactive**: Tạm dừng
- **Scheduled**: Chờ đến thời gian hiển thị
- **Expired**: Đã hết hạn

## Metrics và KPIs

### CTR (Click-Through Rate)

- **Tốt**: ≥ 2%
- **Trung bình**: 1-2%
- **Cần cải thiện**: < 1%

### Engagement Level

- **Cao**: > 1000 lượt xem
- **Trung bình**: 500-1000 lượt xem
- **Thấp**: < 500 lượt xem

## Best Practices

1. **Tối ưu hình ảnh**: Sử dụng hình ảnh chất lượng cao, kích thước phù hợp
2. **Target đúng audience**: Đặt quảng cáo ở vị trí phù hợp với mục tiêu
3. **A/B Testing**: Thử nghiệm nhiều phiên bản để tìm hiệu quả nhất
4. **Theo dõi metrics**: Thường xuyên kiểm tra CTR và engagement
5. **Cân nhặc UX**: Không làm ảnh hưởng trải nghiệm người dùng

## Lưu ý kỹ thuật

- Hình ảnh nên có kích thước phù hợp với vị trí hiển thị
- Script ads cần được kiểm tra kỹ trước khi áp dụng
- URL cần được validate trước khi lưu
- Backup dữ liệu thống kê thường xuyên

## Troubleshooting

### Quảng cáo không hiển thị

1. Kiểm tra trạng thái (phải là Active)
2. Kiểm tra thời gian hiển thị
3. Kiểm tra URL hình ảnh/script

### CTR thấp

1. Thay đổi vị trí đặt quảng cáo
2. Cải thiện creative (hình ảnh/nội dung)
3. Thử targeting khác

### Lỗi script

1. Validate mã script
2. Kiểm tra console browser
3. Test trên staging trước
