"use client";

import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import {
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Pressable } from "@/components/ui/pressable";
import { Icon, PhoneIcon, StarIcon } from "@/components/ui/icon";
import { User, Home, ShoppingCart, Wallet, LogOut } from "lucide-react-native";
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Motion } from "@legendapp/motion";

export default function HomeScreen() {
  const [showSideBar, setShowSideBar] = React.useState(false);
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
    <SafeAreaView className="h-screen w-screen bg-white">
      <View
      // className="w-full h-full md:w-2/3 items-center justify-center"
      >
        {/* Thanh header trên cùng */}
        <View className="flex-row justify-between items-center px-4 py-3">
          <View className="flex-row items-center">
            <Button
              className="bg-primary w-10 items-center"
              onPress={() => setShowSideBar(true)}
            >
              <Feather name="menu" size={28} />
            </Button>
            <Drawer
              isOpen={showSideBar}
              onClose={() => setShowSideBar(false)}
              size="sm"
              anchor="left"
              className="w-full h-screen"
            >
              <DrawerBackdrop
                className="w-full h-screen"
                onPress={() => {
                  setShowSideBar(false);
                }}
              />
              {/* <div
              onClick={() => setShowSideBar(false)}
              className="bg-black opacity-50 absolute inset-1/3 left-0 right-0 z-10"
            /> */}

              <DrawerContent className="w-1/2 md:w-1/4 h-screen">
                <DrawerHeader className="block gap-2 py-5">
                  <HStack
                    space="md"
                    className="h-10 justify-center items-center"
                  >
                    <Avatar className=" bg-indigo-600 rounded-full">
                      <AvatarFallbackText className="text-white w-full">
                        Ronald Richards
                      </AvatarFallbackText>
                      <AvatarBadge />
                    </Avatar>
                    <VStack>
                      <Heading className="text-sm md:text-lg">
                        Ronald Richards
                      </Heading>
                      <Text size="sm">User</Text>
                    </VStack>
                  </HStack>
                </DrawerHeader>
                {/* <Divider className=" my-4" /> */}
                <DrawerBody contentContainerClassName="gap-2">
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon as={User} size="lg" className="text-typography-600" />
                    <Text>My Profile</Text>
                  </Pressable>
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon as={Home} size="lg" className="text-typography-600" />
                    <Text>Saved Address</Text>
                  </Pressable>
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon
                      as={ShoppingCart}
                      size="lg"
                      className="text-typography-600"
                    />
                    <Text>Orders</Text>
                  </Pressable>
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon
                      as={Wallet}
                      size="lg"
                      className="text-typography-600"
                    />
                    <Text>Saved Cards</Text>
                  </Pressable>
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon
                      as={StarIcon}
                      size="lg"
                      className="text-typography-600"
                    />
                    <Text>Review App</Text>
                  </Pressable>
                  <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                    <Icon
                      as={PhoneIcon}
                      size="lg"
                      className="text-typography-600"
                    />
                    <Text>Contact Us</Text>
                  </Pressable>
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    className="w-full gap-2 mb-8"
                    variant="outline"
                    action="secondary"
                  >
                    <ButtonText>Logout</ButtonText>
                    <ButtonIcon as={LogOut} />
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </View>
          {/* Logo */}
          <View className="flex-row items-center">
            <Feather name="book-open" size={28} color="#EF4444" />
            <Text className="ml-2 text-xl font-bold text-gray-800">eBook</Text>
          </View>
          {/* Nút tìm kiếm, tài khoản hoặc thông báo... tuỳ ý */}
          <View className="flex-row items-center">
            <TouchableOpacity className="mr-2">
              <Feather name="search" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="bell" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: "https://picsum.photos/50" }} // ảnh đại diện
                className="w-7 ml-3 h-7 rounded-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Khu vực nội dung chính */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Khối "Mới xuất bản" hoặc "Nổi bật" */}
          <View className="px-4 mt-2">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              New Releases
            </Text>

            {/* Ví dụ 1 cuốn sách nổi bật ở giữa */}
            <View className="bg-white rounded-lg overflow-hidden mb-4">
              <Image
                source={{ uri: "https://picsum.photos/400/600" }}
                className="w-full h-56"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="text-base font-bold text-gray-800 mb-1">
                  48 Nguyên Tắc Chủ Chốt Của Quyền Lực
                </Text>
                <Text className="text-sm text-gray-500 mb-2">
                  Robert Greene
                </Text>
                <TouchableOpacity
                  className="bg-sky-600 rounded-md px-4 py-2"
                  onPress={() => console.log("Xem chi tiết sách...")}
                >
                  <Text className="text-white text-center font-semibold">
                    Nghe thử
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Danh sách đề xuất: "Tuyệt Cho Lần Nghe Đầu", "Có Thể Bạn Quan Tâm", ... */}
          <View className="px-4 mt-2">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Tuyệt Cho Lần Nghe Đầu
            </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {recommended.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  className="mr-4 w-36"
                  onPress={() => console.log("Xem chi tiết sách:", item.title)}
                >
                  <View className="bg-white rounded-lg overflow-hidden mb-2">
                    <Image
                      source={{ uri: item.cover }}
                      className="w-36 h-52"
                      resizeMode="cover"
                    />
                  </View>
                  <Text className="text-sm font-semibold text-gray-800">
                    {item.title}
                  </Text>
                  <Text className="text-xs text-gray-500">{item.author}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Khoảng trống để tránh bị che khuất bởi thanh tab bar (nếu có) */}
          <View className="h-20" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
