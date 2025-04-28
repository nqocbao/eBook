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
  Drawer,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Home, LogOut, User } from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import { Icon } from "@/components/ui/icon";

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

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);

  return (
    <View className="flex-row justify-between items-center px-4 py-3">
      <View className="flex-row items-center">
        <Button
          className="w-10 items-center bg-white"
          onPress={() => setShowSideBar(true)}
        >
          <Feather name="menu" size={28} color="black" />
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
          <DrawerContent className="w-1/2 h-screen">
            <DrawerHeader className="justify-center flex-col gap-2 mt-12">
              <Avatar className="w-24 h-24">
                {/* <AvatarFallbackText>User Image</AvatarFallbackText> */}
                <AvatarImage
                  source={{
                    uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                  }}
                />
              </Avatar>
              <VStack className="justify-center items-center">
                <Text className="text-lg">Bảo Đz</Text>
                <Text className="text-sm text-typography-600">
                  abc@gmail.com
                </Text>
              </VStack>
            </DrawerHeader>
            <DrawerBody contentContainerClassName="gap-2">
              <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                <Icon as={UserIcon} size="lg" className="text-typography-600" />
                <Text>My Profile</Text>
              </Pressable>
              <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                <Icon as={HomeIcon} size="lg" className="text-typography-600" />
                <Text>Saved Book</Text>
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
                className="w-full gap-2 mb-8 h-20 bg-white"
                onPress={() => {
                  console.log("Logout");
                  // Xử lý đăng xuất ở đây
                }}
                variant="outline"
              >
                <ButtonText className="text-gray-600">Logout</ButtonText>
                <ButtonIcon className="text-gray-600" as={LogOut} />
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </View>
      {/* Logo */}
      <View className="flex-row items-center">
        <Feather name="book-open" size={28} color="#EF4444" />
        <RNText className="ml-2 text-xl font-bold text-gray-800">eBook</RNText>
      </View>
      {/* Nút tìm kiếm, tài khoản hoặc thông báo */}
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Feather name="bell" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://picsum.photos/50" }}
            className="w-7 ml-3 h-7 rounded-full"
            resizeMode="cover"
            onError={() => console.log("Failed to load avatar image")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
