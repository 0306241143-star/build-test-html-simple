# Lắng nghe để hiểu

Website tĩnh phục vụ bài tập về **quản lý cảm xúc và xử lý xung đột trong giao tiếp**. Nội dung được chia thành ba chuyên đề: nhận diện cảm xúc, tạm dừng và lựa chọn cách phản hồi, trao đổi nhu cầu và thống nhất giải pháp.

## Mở website

Không cần cài đặt, máy chủ, framework hay cơ sở dữ liệu:

1. Tải hoặc giải nén toàn bộ dự án.
2. Mở `index.html` bằng trình duyệt.
3. Chọn một trong chín trang nội dung trên dashboard hoặc dùng menu điều hướng.

Website có thể chạy trực tiếp từ `index.html`. Một số font chữ tùy chọn được tải từ Google Fonts khi có Internet; nếu không, trang dùng font dự phòng của hệ thống.

## Cấu trúc dự án

```text
.
├── index.html
├── emotion_awareness.html
├── project_introduction.html
├── experience_registration.html
├── topic_pause_response.html
├── communication_scenarios.html
├── user_guide.html
├── needs_and_solutions.html
├── frequently_asked_questions.html
├── visual_library.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── project_banner.svg
│   ├── conflict_resolution_steps.svg
│   └── listening_workshop_poster.svg
└── file_guide_and_member_assignments.pdf
```

## Các trang nội dung

Dashboard `index.html` dẫn đến chín trang dưới đây. Dashboard là trang điều hướng, không tính là một trang nội dung được phân công.

| Thành viên | Trang | Nội dung |
|---|---|---|
| 1 | [`emotion_awareness.html`](emotion_awareness.html) | Chuyên đề nhận diện cảm xúc, tín hiệu cơ thể và nhu cầu phía sau cảm xúc. |
| 1 | [`project_introduction.html`](project_introduction.html) | Bối cảnh, đối tượng, mục tiêu, thông điệp và lộ trình dự án. |
| 1 | [`experience_registration.html`](experience_registration.html) | Biểu mẫu mô phỏng đăng ký hoạt động trải nghiệm. |
| 2 | [`topic_pause_response.html`](topic_pause_response.html) | Chuyên đề tạm dừng và lựa chọn cách phản hồi. |
| 2 | [`communication_scenarios.html`](communication_scenarios.html) | Phân tích ba tình huống và tương tác xem gợi ý phản hồi. |
| 2 | [`user_guide.html`](user_guide.html) | Hướng dẫn khám phá website và thông tin liên hệ giả định. |
| 3 | [`needs_and_solutions.html`](needs_and_solutions.html) | Chuyên đề trao đổi nhu cầu và cùng thống nhất giải pháp. |
| 3 | [`frequently_asked_questions.html`](frequently_asked_questions.html) | Sáu câu hỏi thường gặp với chức năng đóng/mở câu trả lời. |
| 3 | [`visual_library.html`](visual_library.html) | Thư viện chín tư liệu trực quan có chú thích và nguồn. |

Tên thành viên hiện được ghi theo số thứ tự vì chưa có tên cụ thể. Hãy thay bằng tên thật của nhóm trước khi nộp nếu cần.

## Chức năng

- **Chọn tình huống:** trên `communication_scenarios.html`, chọn một trong ba tình huống để xem câu phản hồi gợi ý và lời nhắc tương ứng.
- **Kiểm tra biểu mẫu:** trên `experience_registration.html`, kiểm tra họ tên, email, vai trò, khung giờ và nội dung mong muốn thực hành. Khi hợp lệ, trang hiển thị tóm tắt mô phỏng.
- **FAQ đóng/mở:** trên `frequently_asked_questions.html`, mở hoặc đóng từng câu bằng chuột hoặc bàn phím.
- **Menu di động:** nút Menu mở/đóng điều hướng trên màn hình hẹp.
- **Tư liệu truyền thông:** banner, infographic và poster là các tệp SVG trong `images/`.

Biểu mẫu chỉ kiểm tra và hiển thị tóm tắt trong trình duyệt. Website **không gửi hoặc lưu dữ liệu đăng ký**. Email trên trang hướng dẫn và thông tin sự kiện trên poster chỉ mang tính minh họa.

## Công nghệ

- HTML5, CSS3 và JavaScript thuần.
- Không yêu cầu package manager, framework, backend hoặc cơ sở dữ liệu.
- Các liên kết và tài nguyên dùng đường dẫn tương đối để có thể di chuyển/copy toàn bộ thư mục dự án.

## Quy tắc đặt tên

Tên file dùng chữ thường, tiếng Anh, không dấu, không khoảng trắng; các từ được nối bằng dấu gạch dưới (`snake_case`), ví dụ `user_guide.html` và `project_banner.svg`. Thư mục tài nguyên dùng tên chữ thường: `css/`, `js/`, `images/`.

## Kiểm tra trước khi nộp

1. Mở `index.html` và xác nhận cả chín thẻ dashboard dẫn đến đúng trang.
2. Thử ba lựa chọn trên trang tình huống, gồm cả trạng thái chưa chọn.
3. Thử biểu mẫu với dữ liệu thiếu, email sai và dữ liệu hợp lệ.
4. Mở/đóng các câu hỏi FAQ bằng chuột và bàn phím.
5. Kiểm tra hiển thị ở chiều rộng 1366 px và 390 px; bảo đảm không tràn ngang.
6. Copy/giải nén toàn bộ thư mục sang vị trí khác rồi mở lại `index.html` để kiểm tra đường dẫn tương đối.
7. Cập nhật tên thành viên, nguồn tư liệu và minh chứng công việc thực tế trước khi nộp.
