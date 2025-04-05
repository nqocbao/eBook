# eBook

[![React Native](https://img.shields.io/badge/ReactNative-%2300256C.svg?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020.svg?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

---

## Giới thiệu

**eBook** là ứng dụng đọc sách báo điện tử dành cho người khiếm thị, cho phép tiếp cận tri thức thông qua việc chuyển đổi văn bản thành giọng nói và chữ nổi Braille. Ứng dụng tích hợp các tính năng điều hướng thông minh, ghi chú, đánh dấu nội dung, mô tả hình ảnh và hỗ trợ nội dung đa phương tiện. Với giao diện tùy chỉnh và đồng bộ hóa dữ liệu trên nhiều thiết bị, **eBook** hướng tới việc tạo ra một môi trường học tập số toàn diện, giúp người dùng tiếp cận và tương tác với tài liệu một cách độc lập và hiệu quả.

---

## Tính năng nổi bật

### 1. Chuyển đổi văn bản thành giọng nói (Text-to-Speech)
- **Giọng đọc tùy chỉnh:** Cho phép điều chỉnh giọng đọc, tốc độ và cao độ để tạo ra trải nghiệm nghe tự nhiên.
- **Chuyển đổi chất lượng cao:** Sử dụng API chuyển đổi văn bản thành giọng nói chuyên nghiệp đảm bảo độ chính xác và rõ ràng.

### 2. Điều hướng nội dung thông minh
- **Điều hướng theo cấu trúc:** Di chuyển nhanh qua các chương, đoạn, câu và trang giúp truy cập thông tin một cách trực tiếp.
- **Tìm kiếm nội dung:** Tìm kiếm theo từ khóa giúp định vị nhanh các phần thông tin quan trọng.

### 3. Ghi chú và đánh dấu nội dung
- **Ghi chú đa phương thức:** Cho phép thêm ghi chú dạng văn bản hoặc ghi âm giọng nói trực tiếp vào nội dung.
- **Bookmark:** Tạo và quản lý bookmark để lưu lại vị trí đọc và các đoạn văn bản quan trọng.

### 4. Tùy chỉnh giao diện người dùng
- **Cá nhân hóa giao diện:** Cho phép điều chỉnh kích thước chữ, màu nền, độ tương phản và kiểu chữ phù hợp với nhu cầu cá nhân.
- **Responsive & Đồng bộ hóa:** Ứng dụng hoạt động mượt mà trên máy tính để bàn, smartphone, tablet và đồng bộ hóa dữ liệu qua đám mây.

---

## Kiến trúc & Công nghệ sử dụng

### Frontend
- **React Native:** Xây dựng giao diện ứng dụng di động cho iOS và Android.
- **Expo:** Nền tảng phát triển và triển khai ứng dụng React Native.
- **TailwindCSS:** Tạo giao diện hiện đại, tối giản và dễ tùy chỉnh.

### Backend
- **Express:** Framework Node.js cho xây dựng API linh hoạt và mạnh mẽ.
- **MongoDB:** Cơ sở dữ liệu NoSQL lưu trữ dữ liệu người dùng, tiến trình đọc và ghi chú.

---

## Cấu trúc dự án

```plaintext
eBook/
├── client/                # Ứng dụng di động (React Native + Expo)
│   ├── src/
│   ├── App.js
│   ├── package.json
│   └── ...
├── server/                # API backend (Express + MongoDB)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── .env.example
└── README.md
```


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

6. **Cấu hình kết nối cơ sở dữ liệu** 🔗:
   Tạo file `.env` trong thư mục `server` dựa trên file `.env.example` và thiết lập biến môi trường:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

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

Nếu có bất kỳ thắc mắc hoặc góp ý nào, vui lòng liên hệ qua message:

---

**eBook** hướng tới mục tiêu tạo ra một công cụ hỗ trợ học tập số toàn diện, thân thiện và hiệu quả, giúp người khiếm thị tiếp cận tri thức một cách độc lập và tự chủ. Hãy cùng nhau đóng góp và phát triển dự án để xây dựng một môi trường số công bằng và tiện lợi cho tất cả mọi người!
```
