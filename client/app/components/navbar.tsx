import React, { useEffect, useState } from "react";
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
import {
  Home,
  LogIn,
  LogOut,
  PhoneCallIcon,
  SaveIcon,
  SearchIcon,
  SpaceIcon,
  User,
} from "lucide-react-native";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import {
  CloseIcon,
  EditIcon,
  Icon,
  MenuIcon,
  TrashIcon,
} from "@/components/ui/icon";
import { API_URL } from "@/constants/config";
import { Heading } from "@/components/ui/heading";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useSpeechRate } from "../contexts/SpeechRateContext";
import { useReadingMode } from "../contexts/ReadingModeContext";

// Wrapper components cho các biểu tượng từ Feather
const UserIcon = (props: any) => <Feather name="user" {...props} />;
const HomeIcon = (props: any) => <Feather name="home" {...props} />;
const StarIcon = (props: any) => <Feather name="star" {...props} />;
const PhoneIcon = (props: any) => <Feather name="phone" {...props} />;
const LogOutIcon = (props: any) => <Feather name="log-out" {...props} />;

const Navbar = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isShowLoginCard, setShowLoginCard] = useState(false);
  const [isShowLogoutCard, setShowLogoutCard] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", avatar: "" });
  const { speechRate } = useSpeechRate();
  const { readingEnabled } = useReadingMode();

  const speak = (text: string) => {
    if (readingEnabled) {
      Speech.stop();
      Speech.speak(text, {
        rate: parseFloat(speechRate.toString()),
        language: "vi-VN",
      });
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
        fetchUserInfo(token);
      } else {
        setLoggedIn(false);
      }
    };
    checkToken();
  }, []);

  const handleLogOut = () => {
    AsyncStorage.removeItem("token");
    console.log("Logout");
    setShowSideBar(false);
    setUserInfo({ name: "", email: "", avatar: "" });
    setShowLogoutCard(false);
    setLoggedIn(false);
  };

  const fetchUserInfo = async (token: string | null) => {
    try {
      const response = await fetch(`${API_URL}/api/client/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("User info:", data);
      setUserInfo({
        name: data.user.fullName,
        email: data.user.email,
        avatar: data.user.avatar,
      });
    } catch (error) {
      console.log("Lỗi nè: ", error);
    }
  };

  return (
    <View className="flex-row justify-between items-center px-4 py-3">
      <View className="flex-row items-center">
        <Button
          className="w-10 h-10 items-center bg-transparent"
          onPress={() => setShowSideBar(true)}
        >
          <ButtonIcon className="text-black size-10" as={MenuIcon} />
        </Button>
        <Drawer
          isOpen={showSideBar}
          onClose={() => setShowSideBar(false)}
          size="sm"
          anchor="left"
          className="w-full h-full"
        >
          <DrawerBackdrop
            className="w-full h-full"
            onPress={() => {
              setShowSideBar(false);
            }}
          />
          <DrawerContent className="w-1/2 h-full">
            <DrawerHeader className="justify-center flex-col gap-2 mt-12">
              <Avatar className="w-24 h-24">
                {/* <AvatarFallbackText>User Image</AvatarFallbackText> */}
                {userInfo.avatar === "" ? (
                  <AvatarImage
                    source={{
                      uri: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
                    }}
                  />
                ) : (
                  <AvatarImage
                    source={{
                      uri: "https://i.pinimg.com/736x/3d/9d/ed/3d9ded2ceb902b1c5294e6f564b61728.jpg",
                    }}
                  />
                )}
              </Avatar>
              <VStack className="justify-center items-center">
                <Text className="text-lg">
                  {isLoggedIn ? userInfo.name : "Guess"}
                </Text>
                <Text className="text-sm text-typography-600">
                  {isLoggedIn ? userInfo.email : "abc@gmail.com"}
                </Text>
              </VStack>
            </DrawerHeader>
            <DrawerBody contentContainerClassName="gap-2 pt-3">
              <Pressable
                className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md"
                onPress={() => {
                  speak("Đã chuyển hướng tới mục tìm kiếm");
                  setShowSideBar(false);
                  router.replace("/(tabs)/search");
                }}
              >
                <Icon
                  as={SearchIcon}
                  size="lg"
                  className="text-typography-600"
                />
                <Text>Tìm kiếm</Text>
              </Pressable>
              <Pressable
                className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md"
                onPress={() => {
                  speak("Đã chuyển hướng tới mục yêu thích");
                  setShowSideBar(false);
                  router.replace("/(tabs)/favourite");
                }}
              >
                <Icon as={SaveIcon} size="lg" className="text-typography-600" />
                <Text>Space Book</Text>
              </Pressable>

              <Pressable className="gap-3 ml-3 md:ml-10 flex-row items-center hover:bg-background-50 p-2 rounded-md">
                <Icon
                  as={PhoneCallIcon}
                  size="lg"
                  className="text-typography-600"
                />
                <Text>Contact Us</Text>
              </Pressable>
            </DrawerBody>
            <DrawerFooter>
              {!isLoggedIn && (
                <Button
                  className="w-full gap-2 mb-8 h-20 bg-white border-transparent"
                  onPress={() => {
                    console.log("Login");
                    setShowSideBar(false);
                    router.push("/auth/login");
                  }}
                  variant="outline"
                >
                  <ButtonText className="text-gray-600">Login</ButtonText>
                  <ButtonIcon className="text-gray-600" as={LogIn} />
                </Button>
              )}
              {isLoggedIn && (
                <Button
                  className="w-full gap-2 mb-8 h-20 bg-white border-transparent"
                  onPress={() => setShowLogoutCard(true)}
                  variant="outline"
                >
                  <ButtonText className="text-gray-600">Logout</ButtonText>
                  <ButtonIcon className="text-gray-600" as={LogOut} />
                </Button>
              )}

              <AlertDialog
                isOpen={isShowLogoutCard}
                onClose={() => {
                  setShowLogoutCard(false);
                  setLoggedIn(false);
                }}
                className="h-full w-full"
              >
                <AlertDialogBackdrop />
                <AlertDialogContent className="px-4 pt-1 h-56 w-4/5 items-start justify-center">
                  <AlertDialogHeader className="w-full gap-2">
                    <Heading className="text-xl">Logout</Heading>
                    <AlertDialogCloseButton>
                      <Icon as={CloseIcon} className="size-6" />
                    </AlertDialogCloseButton>
                  </AlertDialogHeader>
                  <AlertDialogBody>
                    <Text className="text-lg">
                      Are you sure, you want to logout?
                    </Text>
                  </AlertDialogBody>
                  <AlertDialogFooter className="w-full flex-row justify-end mr-2 pb-3">
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => setShowLogoutCard(false)}
                      className="h-14 w-24"
                    >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      action="negative"
                      onPress={handleLogOut}
                      className="h-14 w-24"
                    >
                      <ButtonText className="text-white">Logout</ButtonText>
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DrawerFooter>
          </DrawerContent>
          <DrawerFooter></DrawerFooter>
        </Drawer>
      </View>
      {/* Logo */}
      <View className="flex-row items-center">
        <Feather name="book-open" size={28} color="#547792" />
        <RNText className="ml-2 text-xl font-bold text-primary">eBook</RNText>
      </View>
      {/* Nút tìm kiếm, tài khoản hoặc thông báo */}
      <View className="flex-row items-center">
        <TouchableOpacity>
          <Feather name="bell" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          {isLoggedIn ? (
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/3d/9d/ed/3d9ded2ceb902b1c5294e6f564b61728.jpg",
              }}
              className="w-7 ml-3 h-7 rounded-full"
              resizeMode="cover"
              onError={() => console.log("Failed to load avatar image")}
            />
          ) : (
            <Image
              source={{
                uri: "https://i.pinimg.com/736x/40/98/2a/40982a8167f0a53dedce3731178f2ef5.jpg",
              }}
              className="w-7 ml-3 h-7 rounded-full"
              resizeMode="cover"
              onError={() => console.log("Failed to load avatar image")}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Navbar;
