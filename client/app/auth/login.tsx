// File: src/app/login.tsx
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text as RNText,
} from "react-native";
// import { useAuth } from "../context/AuthContext";
import { useRouter } from "expo-router";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box";
import { CheckCircle, CircleX } from "lucide-react-native";

interface alertInfo {
  open: boolean;
  title: string;
  message: string;
  isSuccess: boolean | null;
  onClose: (() => void) | null;
}

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [countDown, setCountDown] = useState(3);
  //   const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (showAlert) {
      const timer = setInterval(() => {
        setCountDown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowAlert(false);
            setTimeout(() => {
              router.replace("/(tabs)"); // Điều hướng sau khi render hoàn tất
            }, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showAlert, router]);

  const handleLogin = async () => {
    const payload = { email, password };
    try {
      const response = await fetch(`${API_URL}/api/client/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (!token) {
          console.log("Error: ", data.message);
          setError(data.message);
        } else {
          console.log("Login ok", data);
          setError("done");
          await AsyncStorage.setItem("token", token);
          setShowAlert(true);
          // await login(email, password);
        }
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
    }
  };

  const handleGuestLogin = () => {
    router.replace("/(tabs)");
  };

  const handleSignUp = () => {
    router.replace("/auth/signup");
  };

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      {/* Logo */}
      <RNText className="text-4xl font-bold text-blue-800 mb-14">eBook</RNText>

      {/* Tiêu đề */}
      <Heading className="text-2xl font-bold mb-6">
        Đăng nhập vào tài khoản
      </Heading>

      {/* Ô nhập Email */}
      <VStack className="w-full mb-4">
        <Text className="text-lg text-gray-600 mb-2">Email</Text>
        <Input className="w-full h-14 pl-3 border border-gray-300 rounded-lg">
          <InputField
            placeholder="Nhập Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>
      </VStack>

      {/* Ô nhập Password */}
      <VStack className="w-full">
        <Text className="text-lg text-gray-600 mb-2">Mật khẩu</Text>
        <Input className="w-full h-14 pl-3 border border-gray-300 rounded-lg">
          <InputField
            placeholder="Nhập mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </Input>
      </VStack>

      {/* Hiển thị lỗi nếu có */}
      <HStack className="h-10 w-full justify-between items-center mb-4">
        {error !== "done" ? (
          <Text className="text-red-500">{error}</Text>
        ) : null}
        <TouchableOpacity>
          <Text className="text-blue-700 text-base">Quên mật khẩu?</Text>
        </TouchableOpacity>
      </HStack>

      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        size="lg"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-[350px] h-[300px] gap-4 items-center">
          <AlertDialogHeader className="flex-col">
            <Box className="rounded-full h-[52px] w-[52px] mt-5 bg-background-error items-center justify-center">
              {error === "done" ? (
                <CheckCircle color="green" size={48} />
              ) : (
                <CircleX color="red" size={48} />
              )}
            </Box>
            {error === "done" ? (
              <Heading size="md">Đăng nhập thành công!</Heading>
            ) : (
              <Heading size="md">Đăng nhập chưa thành công!</Heading>
            )}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="md" className="text-center">
              {error === "done"
                ? `Đang chuyển hướng tới trang chủ trong ${countDown} giây`
                : error}
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              onPress={() => setShowAlert(false)}
              className=" h-14 w-32 bg-slate-500 text-white"
            >
              <ButtonText>Đóng</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Nút Sign in */}
      <Button
        className="w-full h-16 bg-slate-800 rounded-lg py-3 mb-4"
        onPress={handleLogin}
      >
        <ButtonText className="text-white text-center text-lg font-semibold">
          Đăng nhập
        </ButtonText>
      </Button>

      {/* Nút Using as Guest */}
      <Button
        className="w-full h-16 bg-transparent border border-gray-300 rounded-lg py-3 mb-4"
        onPress={handleGuestLogin}
      >
        <ButtonText className="text-gray-600 text-center text-lg">
          Tiếp tục với khách
        </ButtonText>
      </Button>

      {/* Dòng chữ "Or sign in with" và các nút đăng nhập khác */}
      <Text className="text-gray-500 mb-4">— Hoặc đăng nhập với —</Text>
      <HStack className="justify-center gap-9 mb-6">
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </HStack>

      {/* Dòng chữ "Don't have an account? Sign up" */}
      <TouchableOpacity onPress={handleSignUp}>
        <Text className="">
          Bạn chưa có tài khoản?{" "}
          <Text className="text-blue-600 font-semibold">Đăng ký</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
