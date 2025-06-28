# Season Management Test Guide

## Hướng dẫn test chức năng quản lý mùa phim

### 1. Test thêm mùa phim

#### Thêm mùa phim mới:

1. Vào trang admin movie management
2. Chọn một phim bất kỳ để xem chi tiết
3. Click nút "Thêm mùa phim" (nút màu indigo)
4. Chọn loại mùa phim (Mùa chính, Đặc biệt, Phim điện ảnh, OVA/OAD, Ngoại truyện)
5. Điền thông tin:
   - Số mùa (nếu là mùa chính)
   - Tên tùy chỉnh (nếu không phải mùa chính)
   - Mô tả mùa phim
   - Ngày phát hành
6. Click "Thêm mùa phim"

#### Kiểm tra:

- [ ] Modal đóng lại sau khi thêm thành công
- [ ] Season mới xuất hiện ở cuối danh sách tabs (sau mùa cuối cùng)
- [ ] Tab tự động chuyển đến season mới vừa thêm
- [ ] Hiển thị thông báo thành công
- [ ] Không cần reload trang, UI tự động cập nhật

#### Edge cases cần test:

- [ ] Thêm mùa chính với số mùa đã tồn tại → hiển thị lỗi
- [ ] Thêm mùa với tên trùng lặp → hiển thị lỗi
- [ ] Thêm mùa với mô tả ngắn hơn 10 ký tự → hiển thị lỗi
- [ ] Thêm mùa không điền ngày phát hành → hiển thị lỗi

### 2. Test chỉnh sửa mùa phim

#### Chỉnh sửa mùa phim:

1. Vào chi tiết phim có nhiều mùa
2. Chọn tab mùa muốn chỉnh sửa
3. Click nút "✏️" ở phần thông tin mùa
4. Sửa đổi thông tin trong modal:
   - Đổi loại mùa phim
   - Sửa tên/số mùa
   - Cập nhật mô tả
   - Thay đổi ngày phát hành
5. Click "Cập nhật mùa phim"

#### Kiểm tra:

- [ ] Modal hiển thị thông tin hiện tại của mùa
- [ ] Form tự động điền đúng loại mùa phim
- [ ] Tên mùa được tạo tự động theo loại
- [ ] Cập nhật thành công, modal đóng
- [ ] Thông tin mùa hiển thị mới trong tab
- [ ] UI tự động cập nhật không cần reload

### 3. Test xóa mùa phim

#### Xóa mùa phim:

1. Vào chi tiết phim có nhiều hơn 1 mùa
2. Chọn tab mùa muốn xóa
3. Click nút "🗑️" ở phần thông tin mùa
4. Xác nhận xóa trong modal

#### Kiểm tra:

- [ ] Modal xác nhận hiển thị đúng tên mùa
- [ ] Warning về việc xóa tất cả tập phim trong mùa
- [ ] Không thể xóa nếu chỉ còn 1 mùa (nút bị ẩn)
- [ ] Xóa thành công, tab tự động chuyển về mùa đầu tiên
- [ ] Mùa bị xóa biến mất khỏi danh sách tabs
- [ ] UI tự động cập nhật

### 4. Test sắp xếp mùa phim

#### Kiểm tra thứ tự mùa:

1. Thêm nhiều mùa phim mới
2. Kiểm tra thứ tự trong tabs

#### Kiểm tra:

- [ ] Mùa mới luôn xuất hiện ở cuối danh sách
- [ ] Thứ tự không thay đổi theo ngày phát hành
- [ ] Tab tự động chuyển đến mùa mới sau khi thêm

### 5. Test integration với database

#### Kiểm tra dữ liệu thực:

1. Thêm mùa phim mới
2. Refresh trang → mùa vẫn tồn tại
3. Sửa mùa phim
4. Refresh trang → thay đổi vẫn còn
5. Xóa mùa phim
6. Refresh trang → mùa đã bị xóa

### 6. Test loading states

#### Kiểm tra trạng thái loading:

- [ ] Nút "Thêm mùa phim" hiển thị "Đang thêm..." khi loading
- [ ] Nút chỉnh sửa "✏️" hiển thị "..." khi loading
- [ ] Nút xóa "🗑️" hiển thị "..." khi loading
- [ ] Modal chỉnh sửa hiển thị "Đang cập nhật..." khi loading
- [ ] Các nút bị disable khi loading

### 7. Test error handling

#### Kiểm tra xử lý lỗi:

1. Ngắt kết nối internet
2. Thử thêm/sửa/xóa mùa phim
3. Kiểm tra hiển thị lỗi

#### Kiểm tra:

- [ ] Hiển thị thông báo lỗi khi không kết nối được API
- [ ] Không làm crash ứng dụng
- [ ] Modal không tự động đóng khi có lỗi
- [ ] User có thể thử lại

## Script test tự động

```powershell
# Run from project root
cd "d:\code ki 2\CineFlex\cineflex"

# Start development server
npm run dev

# Test checklist:
# 1. Vào http://localhost:5173/admin/movies
# 2. Chọn một phim để xem chi tiết
# 3. Test thêm mùa phim mới
# 4. Test chỉnh sửa mùa phim
# 5. Test xóa mùa phim
# 6. Kiểm tra thứ tự mùa phim
# 7. Refresh và kiểm tra dữ liệu persist
```

## Lưu ý quan trọng

1. **Thứ tự mùa phim**: Mùa mới luôn được thêm vào cuối danh sách, không sắp xếp theo ngày phát hành
2. **Auto-switch tab**: Sau khi thêm mùa mới, tab tự động chuyển đến mùa đó
3. **Validation**: Form có validation đầy đủ cho tất cả trường
4. **Database integration**: Tất cả thao tác đều tương tác trực tiếp với database qua API
5. **No reload**: UI tự động cập nhật mà không cần reload trang
6. **Error handling**: Có xử lý lỗi và loading state đầy đủ
