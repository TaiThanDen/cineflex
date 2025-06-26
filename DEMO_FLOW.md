# Demo Luồng hoạt động - Modal thêm Mùa phim và Tập phim

## 🎬 Scenario Demo: Thêm Season và Episode cho "Breaking Bad"

### Bước 1: Vào trang quản lý phim

1. Truy cập `/admin/movies`
2. Click vào phim "Breaking Bad" để xem chi tiết
3. Màn hình hiển thị:
   - Poster phim bên trái
   - Thông tin phim (genres, mô tả)
   - Danh sách mùa phim hiện có (Season 1)
   - Các nút hành động: "Thêm mùa phim", "Thêm tập phim"

### Bước 2: Thêm mùa phim mới (Season 2)

**Click nút "Thêm mùa phim"** → Mở `AddSeasonModalAdvanced`

**Modal hiển thị:**

```
┌──────────────────────────────────────────────────┐
│ Thêm mùa phim mới                          [×]   │
├──────────────────────────────────────────────────┤
│ Loại mùa phim:                                   │
│ ◉ Mùa chính      ○ Đặc biệt      ○ Phim điện ảnh  │
│ ○ OVA/OAD        ○ Ngoại truyện                  │
│                                                  │
│ Số mùa: [2]  (Đề xuất: 2)                       │
│                                                  │
│ Tên mùa phim (preview): Season 2                 │
│                                                  │
│ Mô tả mùa phim:                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Walter tiếp tục hành trình tội phạm của mình │ │
│ │ trong khi cố gắng che giấu bí mật khỏi gia   │ │
│ │ đình...                                      │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Ngày phát hành: [2009-03-08]                    │
│                                                  │
│ Mùa phim hiện có:                               │
│ • Season 1                              2008     │
│                                                  │
│              [Hủy bỏ]    [Thêm mùa phim]        │
└──────────────────────────────────────────────────┘
```

**Nhập thông tin:**

- Loại: Mùa chính ✓
- Số mùa: 2 ✓
- Mô tả: "Walter tiếp tục hành trình tội phạm..."
- Ngày phát hành: 2009-03-08 ✓

**Click "Thêm mùa phim"** → Modal đóng → Alert: "Mùa phim mới được thêm: Season 2"

### Bước 3: Thêm tập phim cho Season 2

**Click nút "Thêm tập phim"** → Mở `AddEpisodeModalAdvanced`

**Modal hiển thị:**

```
┌──────────────────────────────────────────────────┐
│ Thêm tập phim mới                          [×]   │
├──────────────────────────────────────────────────┤
│ Chọn mùa phim: [Season 2 ▼]                     │
│ ┌──────────────────────────────────────────────┐ │
│ │ Season 2                                     │ │
│ │ Walter tiếp tục hành trình tội phạm...       │ │
│ │ Phát hành: 08/03/2009                        │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Số tập: [1]                                     │
│                                                  │
│ Tên tập: [Seven Thirty-Seven]                   │
│                                                  │
│ URL Video:                                       │
│ [https://cineflex.com/bb-s2e1]                   │
│                                                  │
│ Thời lượng: [47 phút]                           │
│                                                  │
│ Mô tả tập phim:                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Walt và Jesse phải đối mặt với hậu quả của   │ │
│ │ những hành động trong Season 1...            │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Xem trước:                                       │
│ • Mùa: Season 2                                  │
│ • Tập: 1 - Seven Thirty-Seven                   │
│ • Thời lượng: 47 phút                            │
│ • Mô tả: Walt và Jesse phải đối mặt...           │
│                                                  │
│              [Hủy bỏ]    [Thêm tập phim]        │
└──────────────────────────────────────────────────┘
```

**Nhập thông tin:**

- Mùa: Season 2 ✓
- Số tập: 1 ✓
- Tên: "Seven Thirty-Seven" ✓
- URL: "https://cineflex.com/bb-s2e1" ✓
- Thời lượng: "47 phút" ✓
- Mô tả: "Walt và Jesse phải đối mặt với hậu quả..."

**Click "Thêm tập phim"** → Modal đóng → Alert: "Tập phim mới được thêm: Seven Thirty-Seven"

### Bước 4: Thêm ngoại truyện "El Camino"

**Click nút "Thêm mùa phim"** lần nữa

**Modal hiển thị - Chọn loại khác:**

```
┌──────────────────────────────────────────────────┐
│ Thêm mùa phim mới                          [×]   │
├──────────────────────────────────────────────────┤
│ Loại mùa phim:                                   │
│ ○ Mùa chính      ○ Đặc biệt      ◉ Phim điện ảnh  │
│ ○ OVA/OAD        ○ Ngoại truyện                  │
│                                                  │
│ Tên tùy chỉnh: [El Camino: A Breaking Bad Movie] │
│ (Để trống để dùng "Phim điện ảnh")               │
│                                                  │
│ Tên mùa phim (preview): El Camino: A Breaking Bad Movie │
│                                                  │
│ Mô tả mùa phim:                                  │
│ ┌──────────────────────────────────────────────┐ │
│ │ Jesse Pinkman bỏ trốn sau các sự kiện trong  │ │
│ │ Breaking Bad và tìm cách bắt đầu cuộc sống   │ │
│ │ mới...                                       │ │
│ └──────────────────────────────────────────────┘ │
│                                                  │
│ Ngày phát hành: [2019-10-11]                    │
│                                                  │
│ Mùa phim hiện có:                               │
│ • Season 1                              2008     │
│ • Season 2                              2009     │
│                                                  │
│              [Hủy bỏ]    [Thêm mùa phim]        │
└──────────────────────────────────────────────────┘
```

### Bước 5: Test Validation

**Thử thêm Season 5 khi chỉ có Season 1, 2:**

```
┌──────────────────────────────────────────────────┐
│ Số mùa: [5] ❌                                   │
│ ⚠ Không thể thêm mùa 5 khi chỉ có 2 mùa.        │
│   Hãy thêm mùa 3 trước.                          │
└──────────────────────────────────────────────────┘
```

**Thử thêm tập với URL không hợp lệ:**

```
┌──────────────────────────────────────────────────┐
│ URL Video: [not-a-valid-url] ❌                  │
│ ⚠ URL không hợp lệ                               │
└──────────────────────────────────────────────────┘
```

**Thử thêm tập với thời lượng sai format:**

```
┌──────────────────────────────────────────────────┐
│ Thời lượng: [abc minutes] ❌                     │
│ ⚠ Định dạng thời lượng không hợp lệ              │
│   (VD: "45 phút", "1h 30m")                      │
└──────────────────────────────────────────────────┘
```

## 🎯 Các tính năng nổi bật được demo

### AddSeasonModalAdvanced

✅ **Hỗ trợ 5 loại mùa phim** (Regular, Special, Movie, OVA, Extra)
✅ **Auto-suggest season number** (Đề xuất số mùa tiếp theo)
✅ **Validate logic sequence** (Không thể nhảy từ Season 2 → Season 5)
✅ **Check duplicate names** (Không trùng tên mùa)
✅ **Preview title generation** (Tự động tạo tên dựa trên loại)
✅ **Display existing seasons** (Hiển thị danh sách mùa hiện có)

### AddEpisodeModalAdvanced

✅ **Season selector with details** (Dropdown + thông tin chi tiết mùa)
✅ **URL validation** (Kiểm tra format URL)
✅ **Duration format support** (Hỗ trợ nhiều format thời lượng)
✅ **Real-time preview** (Preview thông tin tập sẽ tạo)
✅ **Character counter** (Đếm ký tự mô tả)

### Validation System

✅ **Real-time validation** (Validate ngay khi nhập)
✅ **Cross-field validation** (Logic giữa các field)
✅ **Smart suggestions** (Gợi ý thông minh)
✅ **Error prevention** (Ngăn lỗi logic)

## 🔄 Flow tích hợp với hệ thống

```
MovieAdminPage
├── MovieDetail (hiển thị nút "Thêm mùa", "Thêm tập")
├── AddSeasonModalAdvanced (modal thêm mùa)
├── AddEpisodeModalAdvanced (modal thêm tập)
└── Handler functions (xử lý data, gọi API)
```

**Data Flow:**

1. User click nút → Modal mở
2. User nhập form → Real-time validation
3. User submit → Handler function
4. Handler → API call (TODO)
5. Success → Close modal + Refresh data
6. Error → Show error message

## 🚀 Kết quả sau demo

Sau khi demo, phim "Breaking Bad" sẽ có:

- **Season 1** (có sẵn)
- **Season 2** (vừa thêm) + Episode "Seven Thirty-Seven"
- **El Camino: A Breaking Bad Movie** (ngoại truyện)

Hệ thống đã sẵn sàng để:

- Thêm nhiều tập cho Season 2
- Thêm Season 3, 4, 5...
- Thêm các OVA, specials khác
- Quản lý toàn bộ nội dung một cách chuyên nghiệp

## 💡 Điểm mạnh của hệ thống

1. **User-friendly:** Interface trực quan, dễ sử dụng
2. **Error-proof:** Validation chặt chẽ, ngăn lỗi logic
3. **Flexible:** Hỗ trợ nhiều loại content khác nhau
4. **Scalable:** Dễ mở rộng thêm tính năng
5. **Professional:** UI/UX chuyên nghiệp như các platform streaming thực tế
