"use client";

import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTailwind } from "tailwind-rn";

export default function HomeScreen() {
  const tw = useTailwind();

  // Danh sách chuyên mục (có thể load động từ API)
  const categories = [
    { id: 1, title: "All", name: "align-justify" },
    { id: 2, title: "Drama", name: "refresh-cw" },
    { id: 3, title: "Fantasy", name: "" },
    { id: 4, title: "Comedy", name: "" },
    { id: 5, title: "Other", name: "" },
  ];

  // Danh sách gợi ý (có thể load động từ API)
  const recommended = [
    {
      id: 1,
      title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
      author: "Robert Greene",
      cover: "https://picsum.photos/200/300", // ảnh minh họa
    },
    {
      id: 2,
      title: "Tư Duy Nhanh Và Chậm",
      author: "Daniel Kahneman",
      cover: "https://picsum.photos/200/300?random=1",
    },
    {
      id: 3,
      title: "Sapiens: Lược Sử Loài Người",
      author: "Yuval Noah Harari",
      cover: "https://picsum.photos/200/300?random=2",
    },
  ];

  return (
    <SafeAreaView style={tw("flex-1 bg-white")}>
      {/* Thanh header trên cùng */}
      <View style={tw("flex-row justify-between items-center px-4 py-3")}>
        <View style={tw("flex-row items-center")}>
          <Feather name="book-open" size={28} color="#EF4444" />
          <Text style={tw("ml-2 text-xl font-bold text-gray-800")}>
            eBook Reader
          </Text>
        </View>

        {/* Nút tìm kiếm, tài khoản hoặc thông báo... tuỳ ý */}
        <View style={tw("flex-row items-center")}>
          <TouchableOpacity style={tw("mr-4")}>
            <Feather name="search" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="bell" size={24} color="gray" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Thanh chọn chuyên mục ở ngay dưới header */}
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw("flex px-4 mb-2 h-10")}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={tw(
              "mr-2 px-4 py-1.5 rounded-full bg-gray-200 items-center justify-center"
            )}
          >
            <Feather
              name={cat.name}
              size={20}
              color="gray"
              style={tw("mr-1")}
            />
            <Text style={tw("text-gray-700 font-semibold")}>{cat.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}

      {/* Khu vực nội dung chính */}
      <ScrollView style={tw("flex-1")} showsVerticalScrollIndicator={false}>
        {/* Khối "Mới xuất bản" hoặc "Nổi bật" */}
        <View style={tw("px-4 mt-2")}>
          <Text style={tw("text-lg font-bold text-gray-800 mb-2")}>
            New Releases
          </Text>

          {/* Ví dụ 1 cuốn sách nổi bật ở giữa */}
          <View style={tw("bg-white rounded-lg overflow-hidden mb-4")}>
            <Image
              source={{ uri: "https://picsum.photos/400/600" }}
              style={tw("w-full h-56")}
              resizeMode="cover"
            />
            <View style={tw("p-3")}>
              <Text style={tw("text-base font-bold text-gray-800 mb-1")}>
                48 Nguyên Tắc Chủ Chốt Của Quyền Lực
              </Text>
              <Text style={tw("text-sm text-gray-500 mb-2")}>
                Robert Greene
              </Text>
              <TouchableOpacity
                style={tw("bg-sky-600 rounded-md px-4 py-2")}
                onPress={() => console.log("Xem chi tiết sách...")}
              >
                <Text style={tw("text-white text-center font-semibold")}>
                  Nghe thử
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Danh sách đề xuất: "Tuyệt Cho Lần Nghe Đầu", "Có Thể Bạn Quan Tâm", ... */}
        <View style={tw("px-4 mt-2")}>
          <Text style={tw("text-lg font-bold text-gray-800 mb-2")}>
            Tuyệt Cho Lần Nghe Đầu
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommended.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={tw("mr-4 w-36")}
                onPress={() => console.log("Xem chi tiết sách:", item.title)}
              >
                <View style={tw("bg-white rounded-lg overflow-hidden mb-2")}>
                  <Image
                    source={{ uri: item.cover }}
                    style={tw("w-36 h-52")}
                    resizeMode="cover"
                  />
                </View>
                <Text style={tw("text-sm font-semibold text-gray-800")}>
                  {item.title}
                </Text>
                <Text style={tw("text-xs text-gray-500")}>{item.author}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Khoảng trống để tránh bị che khuất bởi thanh tab bar (nếu có) */}
        <View style={tw("h-20")} />
      </ScrollView>
    </SafeAreaView>
  );
}
