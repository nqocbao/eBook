import { Platform } from "react-native";

export const API_URL =
  Platform.OS !== "android"
    ? `http://192.168.1.171:5000`
    : "http://10.0.2.2:5000";

// nếu đang sử dụng nền tảng web hoặc ios thì cần phải thay đổi địa chỉ 192.168.1.xxx tương ứng với IPv4 address hiện tại của máy
// cách lấy IPv4 hiện tại
// b1: vào cmd
// b2: nhập ipconfig
// b3: lấy address tại mục IPv4 và thay nó cho address 192.168.1.xxx ở trên
// bởi vì nó liên quan đến kết nối wifi, dẫn đến sự thay đổi IPv4 khi kết nối khác mạng dữ liệu
