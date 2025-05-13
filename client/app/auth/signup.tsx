// File: src/app/signup.tsx
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
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogBackdrop,
} from "@/components/ui/alert-dialog";
import { Box } from "@/components/ui/box"; // Import Box component
import { CheckIcon, Icon, TrashIcon } from "@/components/ui/icon";
import {
  AccessibilityIcon,
  CheckCircle,
  CircleX,
  Feather,
} from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useSpeechRate } from "../contexts/SpeechRateContext";
import { useReadingMode } from "../contexts/ReadingModeContext";

export default function SignUpScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [accessSignUp, setAccessSignUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [countDown, setCountDown] = useState(3);
  const [error, setError] = useState("");
  const router = useRouter();
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
    if (accessSignUp && error === "done" && showAlert) {
      if (countDown === 0) {
        setShowAlert(false);
        router.replace("/(tabs)");
        return;
      }
      const timer = setTimeout(() => {
        setCountDown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [accessSignUp, error, showAlert, countDown, router]);

  const handleSignUp = async () => {
    const payload = { fullName, email, password };

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu chưa khớp!");
      speak("Mật khẩu và xác nhận mật khẩu chưa khớp!");
      setShowAlert(true);
      return;
    }

    if (fullName === "") {
      setError("Hãy nhập thêm thông tin họ và tên");
      speak("Hãy nhập thêm thông tin họ và tên");
      setShowAlert(true);
      return;
    }

    if (email === "") {
      setError("Hãy nhập thêm thông tin email");
      speak("Hãy nhập thêm thông tin email");
      setShowAlert(true);
      return;
    }

    if (password === "") {
      setError("Hãy nhập thêm mật khẩu");
      speak("Hãy nhập thêm mật khẩu");
      setShowAlert(true);
      return;
    }

    if (error === "" && fullName !== "") {
      setShowAlert(true);
      setCountDown(3); // reset lại mỗi lần mở alert
      speak(`Đang chuyển hướng tới trang chủ trong 3 giây`);
      setAccessSignUp(true);
    }
    try {
      const response = await fetch(`${API_URL}/api/client/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        if (token) {
          await AsyncStorage.setItem("token", token);
          console.log("Đăng ký thành công: ", data);
          setShowAlert(true);
          setError("done");
          setAccessSignUp(true);
        } else {
          setShowAlert(true);
          setError(data.message);
          setAccessSignUp(false);
        }
      } else {
        const error = await response.json();
        console.log("Lỗi đăng ký: ", error);
      }
    } catch (error) {
      console.log("Lỗi kết nối: ", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth/login"); // Điều hướng về màn hình đăng nhập
  };

  return (
    <View className="flex-1 bg-white justify-center items-center p-6">
      {/* Logo */}
      <RNText className="text-3xl font-bold text-blue-800 mb-8">eBook</RNText>

      {/* Tiêu đề */}
      <Heading className="text-2xl font-bold mb-6">Tạo tài khoản</Heading>

      {/* Ô nhập Họ và tên */}
      <VStack className="w-full mb-4">
        <Text className="text-lg text-gray-600 mb-2">Họ và tên</Text>
        <Input className="w-full h-14 pl-3 border border-gray-300 rounded-lg">
          <InputField
            placeholder="Nhập họ và tên"
            value={fullName}
            onChangeText={setFullName}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>
      </VStack>

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
      <VStack className="w-full mb-4">
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

      {/* Ô nhập Confirm Password */}
      <VStack className="w-full mb-6">
        <Text className="text-lg text-gray-600 mb-2">Xác nhận mật khẩu</Text>
        <Input className="w-full h-14 pl-3 border border-gray-300 rounded-lg">
          <InputField
            placeholder="Nhập lại mật khẩu"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </Input>
      </VStack>

      {/* Hiển thị lỗi nếu có */}
      {error !== "done" ? (
        <Text className="text-red-500 mb-4">{error}</Text>
      ) : null}

      {/* Hiển thị thông báo đky thành công rồi chuyển hướng qua Home */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        size="lg"
      >
        <AlertDialogBackdrop />
        <AlertDialogContent className="w-[350px] h-[300px] gap-4 items-center">
          <AlertDialogHeader className="flex-col">
            <Box className="rounded-full h-[52px] w-[52px] mt-5 bg-background-error items-center justify-center">
              {accessSignUp ? (
                <CheckCircle color="green" size={48} />
              ) : (
                <CircleX color="red" size={48} />
              )}
            </Box>
            {accessSignUp ? (
              <Heading size="md">Đăng ký thành công!</Heading>
            ) : (
              <Heading size="md">Đăng ký chưa thành công!</Heading>
            )}
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="md" className="text-center">
              {accessSignUp
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

      {/* Nút Sign up */}
      <Button
        className="w-full h-16 bg-slate-800 rounded-lg py-3 mb-4"
        onPress={handleSignUp}
      >
        <ButtonText className="text-white text-center text-lg font-semibold">
          Đăng ký
        </ButtonText>
      </Button>

      {/* Dòng chữ "Or sign up with" và các nút đăng nhập khác */}
      <Text className="text-gray-500 mb-4">— Hoặc đăng nhập với —</Text>
      <HStack className="justify-center gap-9 mb-5">
        {/* Nút Google */}
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/281/281764.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>

        {/* Nút Facebook */}
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733547.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>

        {/* Nút Twitter */}
        <TouchableOpacity className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/733/733579.png",
            }}
            className="w-6 h-6"
          />
        </TouchableOpacity>
      </HStack>

      <TouchableOpacity onPress={handleLoginRedirect}>
        <Text>
          Bạn đã có tài khoản?{" "}
          <Text className=" text-blue-600 font-semibold">Đăng nhập</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
