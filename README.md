# Lắng nghe để hiểu

Website tĩnh giới thiệu kỹ năng giao tiếp tích cực. Người xem có thể đọc quy trình tạm dừng, chọn phản hồi và thực hành qua các tình huống.

## Cách mở website

1. Tải hoặc giải nén toàn bộ thư mục dự án.
2. Mở `index.html` bằng trình duyệt.
3. Chọn một trang từ menu hoặc các thẻ nội dung.

Không cần cài phần mềm hay chạy máy chủ. Một số phông chữ được tải từ Google Fonts; nếu không có Internet, trang dùng phông chữ có sẵn trên máy.

## Cấu trúc thư mục

```text
.
├── index.html
├── topic_pause_response.html
├── communication_scenarios.html
├── user_guide.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── site_logo.png
│   └── conflict_resolution_steps.svg
└── file_guide_and_member_assignments.pdf
```

## Các trang đang được giữ lại

| Trang | Nội dung |
|---|---|
| `index.html` | Giới thiệu website và liên kết đến các trang còn lại. |
| `topic_pause_response.html` | Các bước tạm dừng và lựa chọn cách phản hồi. |
| `communication_scenarios.html` | Tình huống thực hành và gợi ý phản hồi tương tác. |
| `user_guide.html` | Hướng dẫn sử dụng website. |

Các liên kết từng trỏ đến những trang không còn trong dự án đã được chuyển tới nội dung phù hợp nhất trong bốn trang hiện có. Nhãn menu và thẻ nội dung cũng được cập nhật để phản ánh đúng nơi người xem sẽ đến.

## Tư liệu hình ảnh

- `site_logo.png` là logo hiển thị trong đầu trang và chân trang.
- `conflict_resolution_steps.svg` là infographic về các bước trao đổi khi bất đồng.

## Tìm hiểu CSS

Tệp `css/style.css` điều khiển màu sắc, phông chữ, khoảng cách và bố cục:

- Các biến màu và phông chữ nằm ở đầu tệp trong `:root`. Thay giá trị ở đây để cập nhật giao diện đồng bộ.
- Mỗi bộ chọn (selector), ví dụ `.site-header`, áp dụng kiểu cho phần tử HTML có lớp tương ứng.
- Các phần trong `@media` điều chỉnh bố cục theo chiều rộng màn hình: dưới 760 px và dưới 480 px.
- Mỗi quy tắc được viết thành nhiều dòng để dễ nhận ra bộ chọn và từng thuộc tính.

## Chức năng

- Menu thu gọn thành nút trên màn hình nhỏ.
- Trang tình huống hiển thị gợi ý phản hồi khi người xem chọn một tình huống.
- Trang chủ có bảng tóm tắt lộ trình; trang tình huống có biểu mẫu thực hành với nút gửi và phản hồi ngay trên trình duyệt.
- Website chỉ chạy bằng HTML, CSS và JavaScript; không gửi hay lưu thông tin người dùng.

## Kiểm tra cơ bản

1. Mở `index.html` và thử các liên kết trong menu.
2. Mở trang tình huống, đổi lựa chọn và kiểm tra phần gợi ý phản hồi.
3. Thu nhỏ cửa sổ trình duyệt để kiểm tra menu và bố cục di động.
4. Kiểm tra lại đường dẫn sau khi sao chép toàn bộ thư mục sang vị trí khác.
