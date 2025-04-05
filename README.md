# eBook

[![React Native](https://img.shields.io/badge/ReactNative-%2300256C.svg?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## Giới thiệu

**eBook** là ứng dụng đọc sách báo điện tử dành cho người khiếm thị, cho phép tiếp cận tri thức thông qua việc chuyển đổi văn bản thành giọng nói và chữ nổi Braille. Ứng dụng tích hợp các tính năng điều hướng thông minh, ghi chú, đánh dấu nội dung, mô tả hình ảnh và hỗ trợ nội dung đa phương tiện. Với giao diện tùy chỉnh và đồng bộ hóa dữ liệu trên nhiều thiết bị, **eBook** hướng tới việc tạo ra một môi trường học tập số toàn diện, giúp người dùng tiếp cận và tương tác với tài liệu một cách độc lập và hiệu quả.

Link ERD: https://dbdiagram.io/d/eBook-67e4ed854f7afba18464507f

---
## Môi Trường Phát Triển

### 1. **Frontend**

- **URL**: `http://localhost:8081`
- **Công Nghệ Sử Dụng**:
  - React Native
  - Expo
  - TailwindCSS

### 2. **Backend**

- **URL**: `http://localhost:5000`
- **Công Nghệ Sử Dụng**:
  - Express.js
  - MongoDb

---

## Hướng dẫn cài đặt 🛠️

### Yêu cầu hệ thống 💻
- **Node.js:** Phiên bản 14 hoặc cao hơn.
- **npm hoặc yarn:** Quản lý gói.
- **Expo CLI:** Để phát triển ứng dụng di động.

### Các bước cài đặt 🔧

1. **Clone repository** 📥:
   ```bash
   git clone https://github.com/your-username/eBook.git
   cd eBook
   ```

2. **Cài đặt dependencies cho Frontend** ⚛️:
   ```bash
   cd client
   npm install
   # hoặc sử dụng yarn
   yarn install
   ```

3. **Chạy ứng dụng Frontend** 🚀:
   ```bash
   expo start
   ```

4. **Cài đặt dependencies cho Backend** 🔌:
   ```bash
   cd ../server
   npm install
   # hoặc sử dụng yarn
   yarn install
   ```

5. **Chạy ứng dụng Backend** ⚙️:
   ```bash
   npm start
   # hoặc
   yarn start
   ```
---
## :twisted_rightwards_arrows: Cách làm việc nhóm 

### 1. **Chiến Lược Branching**

Để tránh xung đột mã nguồn, các thành viên nên tuân thủ chiến lược **branching**:

- **Nhánh Chính (`main`)**: Luôn chứa mã nguồn ổn định và sẵn sàng cho sản xuất. Không commit trực tiếp vào nhánh này.
- **Nhánh Phát Triển (`dev`)**: Dùng để phát triển, các tính năng sẽ được merge vào sau khi review. Bảo sẽ là người review và merge. Không commit trực tiếp vào nhánh này.
- **Nhánh Tính Năng**: Mỗi thành viên tạo một nhánh riêng khi làm việc trên một task cụ thể. Ví dụ:
  - `feature/Search-Homesreen`
  - `feature/admin-dashboard`

#### Các bước tạo và làm việc trên nhánh tính năng:

1. Lấy các thay đổi mới nhất từ nhánh `dev`:

   ```bash
   git checkout dev
   git pull origin dev
   ```

2. Tạo một nhánh tính năng mới:

   ```bash
   git checkout -b feature/my-feature
   ```

3. Sau khi hoàn thành, commit và đẩy thay đổi lên:

   ```bash
   git add .
   git commit -m "feat: implement feature X"
   git push origin feature/my-feature
   ```

4. Nhắn Bảo để review và merge hoặc tạo pull request.

### 2. **Quy Tắc Đặt Tên Commit**

Sử dụng các thông báo commit rõ ràng và nhất quán:

- **feat:** cho tính năng mới
- **fix:** cho sửa lỗi
- **refactor:** cho cấu trúc lại mã
- **chore:** cho công việc liên quan đến build tools hoặc dependencies
- **docs:** cho các thay đổi về tài liệu

Ví dụ:

```bash
feat: Thêm Banner cho homescreen
fix: Sửa lỗi không thể đọc được tiêu đề truyện
```

## Tài Liệu API

Chúng ta sẽ có các API để xử lý thông tin truyện, đọc truyện báo, và chuyển đổi ngôn ngữ. 

- Sử dụng **Postman** hoặc **Insomnia** để kiểm tra API.
- Tài liệu API sẽ được bổ sung trong thư mục backend khi dự án tiến triển.

### 3. **Quy Trình Code Review**

- Mỗi pull request cần được review trước khi merge vào `main` hoặc `dev`.
- Bảo sẽ là người chịu trách nhiệm merge.
- Sử dụng **GitHub Issues** hoặc bình luận trên pull request để thảo luận (hoặc nhắn Messenger khi cần).
---


## Hướng dẫn sử dụng

Sau khi cài đặt, người dùng có thể:
- Mở ứng dụng **eBook** và chọn các tài liệu sách báo điện tử từ danh sách có sẵn.
- Nghe nội dung sách báo với chức năng chuyển đổi văn bản thành giọng nói, có thể tùy chỉnh giọng đọc, tốc độ và cao độ.
- Sử dụng các lệnh điều hướng thông minh để di chuyển qua lại giữa các chương, đoạn, câu và trang.
- Thêm ghi chú, đánh dấu và tạo bookmark cho các đoạn văn bản quan trọng nhằm hỗ trợ việc ôn tập.
- Tùy chỉnh giao diện hiển thị theo sở thích cá nhân và đồng bộ hóa dữ liệu trên nhiều thiết bị.
- Tra cứu từ điển và dịch thuật trực tiếp trong ứng dụng để hỗ trợ quá trình học tập.
---
## :iphone: Cách chạy thử Ứng Dụng

Nếu bạn muốn test ứng dụng, bạn có thể tải bản build trực tiếp trên App Store hoặc Google Play:

[![App Store](https://img.shields.io/badge/App%20Store-Download-blue?style=for-the-badge&logo=apple)](https://apps.apple.com/) [![Google Play](https://img.shields.io/badge/Google%20Play-Download-green?style=for-the-badge&logo=google-play)](https://play.google.com/)

Ngoài ra, bạn có thể test phiên bản phát triển qua Expo bằng cách quét mã QR khi chạy lệnh `expo start` từ terminal.

Nếu có bất kỳ thắc mắc hoặc góp ý nào, vui lòng liên hệ qua message.

---

**eBook** hướng tới mục tiêu tạo ra một công cụ hỗ trợ học tập số toàn diện, thân thiện và hiệu quả, giúp người khiếm thị tiếp cận tri thức một cách độc lập và tự chủ. Hãy cùng nhau đóng góp và phát triển dự án để xây dựng một môi trường số công bằng và tiện lợi cho tất cả mọi người!
