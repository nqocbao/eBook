import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text as RNText,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  Heading,
  Text,
  Pressable,
  Icon,
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  VStack,
  HStack,
} from "@gluestack-ui/themed";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { AvatarImage } from "@/components/ui/avatar";
import { Home, LogOut, User } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import Navbar from "../components/navbar";

// Wrapper components cho các biểu tượng từ Feather
const UserIcon = (props: any) => <Feather name="user" {...props} />;
const HomeIcon = (props: any) => <Feather name="home" {...props} />;
const ShoppingCartIcon = (props: any) => (
  <Feather name="shopping-cart" {...props} />
);
const CreditCardIcon = (props: any) => (
  <Feather name="credit-card" {...props} />
);
const StarIcon = (props: any) => <Feather name="star" {...props} />;
const PhoneIcon = (props: any) => <Feather name="phone" {...props} />;
const LogOutIcon = (props: any) => <Feather name="log-out" {...props} />;

// Danh sách chuyên mục (có thể load động từ API)
const categories = [
  { id: 1, title: "All" },
  { id: 2, title: "Drama" },
  { id: 3, title: "Fantasy" },
  { id: 4, title: "Comedy" },
  { id: 5, title: "Other" },
];

// Danh sách gợi ý (có thể load động từ API)
const recommended = [
  {
    id: 1,
    title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
    author: "Robert Greene",
    cover: "https://picsum.photos/200/300?random=1",
  },
  {
    id: 2,
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    cover: "https://picsum.photos/200/300?random=2",
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    cover: "https://picsum.photos/200/300?random=3",
  },
];

// Danh sách sách mới xuất bản
const newReleases = [
  {
    id: 1,
    title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
    author: "Robert Greene",
    cover: "https://picsum.photos/400/600?random=1",
  },
  {
    id: 2,
    title: "Tư Duy Nhanh Và Chậm",
    author: "Daniel Kahneman",
    cover: "https://picsum.photos/400/600?random=2",
  },
  {
    id: 3,
    title: "Sapiens: Lược Sử Loài Người",
    author: "Yuval Noah Harari",
    cover: "https://picsum.photos/400/600?random=3",
  },
];

export default function HomeScreen() {
  // Debug log để kiểm tra render
  console.log("Rendering HomeScreen");

  return (
    <SafeAreaView className="h-screen w-screen bg-white">
      <View className="w-full h-full">
        {/* Thanh header trên cùng */}
        <Navbar />

        {/* Khu vực nội dung chính */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Khối "Mới xuất bản" hoặc "Nổi bật" */}
          <View className="px-4 mt-2">
            <RNText className="text-lg font-bold text-gray-800 mb-2">
              New Releases
            </RNText>

            {/* Ví dụ 1 cuốn sách nổi bật ở giữa */}
            <View className="w-full justify-center items-center">
              <View className="bg-white rounded-lg w-2/3  overflow-hidden mb-4 shadow-md">
                <Image
                  source={{ uri: "https://picsum.photos/400/600" }}
                  className="w-full h-56"
                  resizeMode="cover"
                  onError={() =>
                    console.log("Failed to load New Releases image")
                  }
                />
                <View className="p-3">
                  <RNText className="text-base font-bold text-gray-800 mb-1">
                    48 Nguyên Tắc Chủ Chốt Của Quyền Lực
                  </RNText>
                  <RNText className="text-sm text-gray-500 mb-2">
                    Robert Greene
                  </RNText>
                  <TouchableOpacity
                    className="bg-purple-500 rounded-md px-4 py-2"
                    onPress={() => console.log("Xem chi tiết sách...")}
                  >
                    <RNText className="text-white text-center font-semibold">
                      Nghe thử
                    </RNText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Danh sách đề xuất: "Tuyệt Cho Lần Nghe Đầu" */}
          <View className="px-4 mt-2">
            <RNText className="text-lg font-bold text-gray-800 mb-2">
              Tuyệt Cho Lần Nghe Đầu
            </RNText>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommended.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="mr-4 w-36"
                  onPress={() => console.log("Xem chi tiết sách:", item.title)}
                >
                  <View className="bg-white rounded-lg overflow-hidden mb-2 shadow-md">
                    <Image
                      source={{ uri: item.cover }}
                      className="w-36 h-52"
                      resizeMode="cover"
                      onError={() =>
                        console.log(`Failed to load image for ${item.title}`)
                      }
                    />
                  </View>
                  <RNText className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </RNText>
                  <RNText className="text-xs text-gray-500">
                    {item.author}
                  </RNText>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Khoảng trống để tránh bị che khuất bởi thanh tab bar */}
          <View className="h-20" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
