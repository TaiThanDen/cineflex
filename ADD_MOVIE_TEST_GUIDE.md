# Add Movie Test Guide

## Hướng dẫn test chức năng thêm phim mới

### 🚀 Chức năng đã tích hợp:

1. **AddMovieModal** - Modal thêm phim với database integration:

   - Form đầy đủ với validation
   - Tích hợp với API `addShow`
   - Loading states và error handling
   - Auto refresh UI sau khi thêm

2. **MovieGrid** - Danh sách phim với nút thêm:
   - Nút "Thêm phim" mở modal
   - UI tự động cập nhật sau khi thêm
   - Search và filter phim

### 📋 Test Cases

#### 1. Test thêm phim thành công

**Các bước:**

1. Vào trang Admin Movie Management
2. Click nút "+ Thêm phim" (màu indigo)
3. Điền form với thông tin hợp lệ:
   - **Tên phim**: "Test Movie 2024"
   - **URL Poster**: "https://via.placeholder.com/300x400/indigo/white?text=Test"
   - **Mô tả**: "Đây là phim test với mô tả đầy đủ hơn 10 ký tự"
   - **Ngày phát hành**: Chọn một ngày
   - **Độ tuổi**: Chọn "13+"
   - **Checkbox**: Check "Là series" và "Đang phát sóng"
4. Click "Thêm phim"

**Kết quả mong đợi:**

- [ ] Modal đóng lại
- [ ] Hiển thị thông báo "Thêm phim thành công!"
- [ ] Phim mới xuất hiện trong danh sách (không cần reload)
- [ ] UI tự động cập nhật

#### 2. Test validation form

**Các bước test lỗi:**

**2.1. Tên phim trống:**

- Để trống tên phim → hiển thị "Tên phim là bắt buộc"

**2.2. Tên phim quá ngắn:**

- Nhập "A" → hiển thị "Tên phim phải có ít nhất 2 ký tự"

**2.3. URL poster không hợp lệ:**

- Nhập "not-a-url" → hiển thị "URL poster không hợp lệ"

**2.4. Mô tả trống:**

- Để trống mô tả → hiển thị "Mô tả phim là bắt buộc"

**2.5. Mô tả quá ngắn:**

- Nhập "Test" → hiển thị "Mô tả phải có ít nhất 10 ký tự"

**2.6. Ngày phát hành trống:**

- Không chọn ngày → hiển thị "Ngày phát hành là bắt buộc"

**Kết quả mong đợi:**

- [ ] Form không submit khi có lỗi
- [ ] Hiển thị lỗi ở từng field tương ứng
- [ ] Border field đổi màu đỏ khi có lỗi
- [ ] Modal không đóng khi có lỗi

#### 3. Test loading states

**Các bước:**

1. Mở modal thêm phim
2. Điền form hợp lệ
3. Click "Thêm phim"
4. Quan sát loading state

**Kết quả mong đợi:**

- [ ] Nút submit đổi thành "Đang thêm..."
- [ ] Nút submit bị disable
- [ ] Nút "Hủy bỏ" bị disable
- [ ] Nút đóng (×) bị disable
- [ ] Loading state kết thúc sau khi API response

#### 4. Test error handling

**Cách test:**

1. Ngắt kết nối internet hoặc tắt backend
2. Thử thêm phim
3. Kiểm tra xử lý lỗi

**Kết quả mong đợi:**

- [ ] Hiển thị thông báo lỗi khi không kết nối được API
- [ ] Modal không tự động đóng khi có lỗi
- [ ] Có thể thử lại sau khi khôi phục kết nối
- [ ] Ứng dụng không crash

#### 5. Test UI/UX

**Kiểm tra giao diện:**

- [ ] Modal responsive trên mobile/desktop
- [ ] Form fields có focus states
- [ ] Hover effects trên buttons
- [ ] Typography và spacing consistent
- [ ] Color scheme phù hợp

#### 6. Test integration với database

**Kiểm tra dữ liệu persist:**

1. Thêm phim mới
2. Refresh trang
3. Kiểm tra phim vẫn tồn tại

**Kết quả mong đợi:**

- [ ] Phim mới vẫn hiển thị sau refresh
- [ ] Dữ liệu được lưu đúng trong database
- [ ] Có thể xem chi tiết phim mới

### 🔧 API Integration Details

#### Request Format:

```json
{
  "title": "Test Movie 2024",
  "description": "Đây là phim test với mô tả đầy đủ",
  "releaseDate": "2024-12-25",
  "thumbnail": "https://via.placeholder.com/300x400",
  "onGoing": true,
  "isSeries": true,
  "ageRating": "13+"
}
```

#### API Endpoint:

- **POST** `/api/shows`
- **Headers**: `Authorization: Bearer <token>`
- **Content-Type**: `application/json`

#### Response:

```json
{
  "id": "generated-uuid",
  "title": "Test Movie 2024",
  "description": "Đây là phim test với mô tả đầy đủ",
  "releaseDate": "2024-12-25T00:00:00.000Z",
  "thumbnail": "https://via.placeholder.com/300x400",
  "onGoing": true,
  "isSeries": true,
  "ageRating": "13+",
  "createdAt": "2024-12-27T...",
  "updatedAt": "2024-12-27T..."
}
```

### 🎯 React Query Cache Management

**Queries được invalidate:**

- `["movies"]`
- `["movie"]`
- `["all-movies-with-details"]`
- `["shows"]`

**Auto refresh behavior:**

- UI tự động cập nhật mà không cần reload
- Danh sách phim refetch sau khi thêm thành công
- Loading states trong quá trình cache invalidation

### ⚡ Performance Notes

1. **Optimistic Updates**: Hiện tại chưa implement, có thể thêm sau
2. **Cache Strategy**: Invalidate toàn bộ, có thể optimize bằng cách thêm vào cache
3. **Error Recovery**: Auto retry khi network error
4. **Loading States**: Đầy đủ loading indicators

### 🐛 Common Issues & Solutions

**Issue 1: Modal không đóng sau submit**

- Check console errors
- Verify API response format
- Check onClose callback

**Issue 2: UI không auto refresh**

- Verify React Query setup
- Check query key matching
- Verify invalidateQueries calls

**Issue 3: Validation không hoạt động**

- Check form state updates
- Verify validation logic
- Check error state display

**Issue 4: API errors**

- Check network tab
- Verify authentication token
- Check API endpoint and method

### 📝 Test Script

```bash
# Start development environment
cd "d:\code ki 2\CineFlex\cineflex"
npm run dev

# Test checklist:
# 1. Open http://localhost:5173/admin/movies
# 2. Click "+ Thêm phim"
# 3. Test all validation cases
# 4. Test successful add
# 5. Verify auto refresh
# 6. Test error handling
# 7. Check responsiveness
```

### Success Criteria

Chức năng được coi là thành công khi:

- [ ] Có thể thêm phim mới thành công
- [ ] Form validation hoạt động đúng
- [ ] UI tự động cập nhật không cần reload
- [ ] Loading states hiển thị chính xác
- [ ] Error handling hoạt động tốt
- [ ] Dữ liệu persist trong database
- [ ] Responsive trên mọi thiết bị
- [ ] Performance ổn định
