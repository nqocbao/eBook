import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text as RNText,
  ScrollView,
} from "react-native";
import * as Speech from "expo-speech";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { HeartIcon } from "lucide-react-native";
import ListenCard from "./ListenCard";
import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { useSpeechRate } from "../contexts/SpeechRateContext";
import { useReadingMode } from "../contexts/ReadingModeContext";

// Hàm TTS
const speak = (text: string): void => {
  Speech.speak(text, { language: "vi" });
};

// Định nghĩa kiểu cho props
interface BookCardProps {
  isBookCardVisible: boolean;
  setBookCardVisible: (isBookCardVisible: boolean) => void;
  book: {
    _id: string;
    title: string;
    author: string;
    category_id: string[];
    thumbnail: string;
    pages?: number;
    reads?: string;
    likes?: string;
    description?: string;
    content?: string;
    isPublished?: boolean;
  };
}

const BookCard: React.FC<BookCardProps> = ({
  isBookCardVisible,
  setBookCardVisible,
  book,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isShowListenCard, setShowListenCard] = useState(false);
  const { speechRate } = useSpeechRate();
  const { readingEnabled } = useReadingMode();

  const speak = (text: string) => {
    if (readingEnabled) {
      Speech.speak(text, {
        rate: parseFloat(speechRate.toString()),
        language: "vi-VN",
      });
    }
  };

  const handleAddToFavorites = async (doc_id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("User is not logged in");
        speak("Bạn cần đăng nhập để thêm vào danh sách yêu thích!");
        alert("Bạn cần đăng nhập để thêm vào danh sách yêu thích!");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/client/favorites/add/${doc_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Error adding to favorites:", data.message);
        speak(data.message || "Không thể thêm vào danh sách yêu thích.");
        alert(data.message || "Không thể thêm vào danh sách yêu thích.");
        return;
      }

      console.log("Book added to favorites:", data);
      speak("Đã thêm vào danh sách yêu thích");
      alert("Đã thêm vào danh sách yêu thích");
    } catch (error) {
      console.log("Error adding to favorites:", error);
      alert(
        "Đã xảy ra lỗi khi thêm vào danh sách yêu thích. Vui lòng thử lại."
      );
    }
  };

  const handleAddToHistory = async (doc_id: string) => {
    console.log("API URL:", `${API_URL}/api/client/history/add/${doc_id}`);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        // alert("Bạn cần đăng nhập để đọc sách!");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/client/history/add/${doc_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      console.log("Book added to history:", data);
    } catch (error) {
      console.error("Error adding to history:", error);
      alert("Đã xảy ra lỗi khi thêm sách vào lịch sử. Vui lòng thử lại.");
    }
  };

  return (
    <Actionsheet
      isOpen={isBookCardVisible}
      onClose={() => setBookCardVisible(false)}
      snapPoints={[85]}
    >
      <ActionsheetBackdrop className="h-screen w-screen" />

      <ActionsheetContent className="flex flex-col rounded-tl-3xl rounded-tr-3xl">
        <Image
          source={{
            uri: book.thumbnail,
          }}
          resizeMode="stretch"
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full items-center justify-center rounded-tl-3xl opacity-10 rounded-tr-3xl"
        />

        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator className=" w-2/5 h-1.5 my-2" />
        </ActionsheetDragIndicatorWrapper>
        <View className="w-full">
          <Button
            onPress={() => setBookCardVisible(false)}
            className="absolute top-2.5 right-3 rounded-full size-10 p-2 bg-red-300 shadow-md "
          >
            <ButtonIcon as={CloseIcon} className="text-black"></ButtonIcon>
          </Button>
        </View>
        <VStack className="w-full mt-3">
          {/* Book Cover and Title/Author */}
          <VStack space="sm" className="justify-center mt-6 items-center">
            <Box className="w-[150px] h-[200px] border border-solid border-outline-300 rounded-sm">
              <Image
                source={{
                  uri: book.thumbnail,
                }} // Replace with the actual book cover URL
                resizeMode="stretch"
                className="flex-1"
              />
            </Box>
            <Text className="font-bold text-lg">{book.title}</Text>
            <Text className="text-sm text-gray-500">{book.author}</Text>
          </VStack>

          {/* Stats (Pages, Views, Likes) */}
          <HStack space="lg" className="justify-center gap-16 mt-4">
            <VStack className="items-center">
              <Text className="font-bold">142</Text>
              <Text className="text-xs text-gray-500">Trang</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">14.3k</Text>
              <Text className="text-xs text-gray-500">Lượt đọc</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">211k</Text>
              <Text className="text-xs text-gray-500">Yêu thích</Text>
            </VStack>
          </HStack>

          {/* Description */}
          <VStack className="mt-4 mx-5">
            <ScrollView showsHorizontalScrollIndicator={false} className="h-72">
              <Text className="text-lg text-gray-700">{book.description}</Text>
            </ScrollView>
          </VStack>

          {/* Action Buttons */}
        </VStack>
        <View className="absolute bottom-16 left-0 right-0 px-4">
          <HStack space="md" className="justify-center">
            <View className="h-full items-center justify-center">
              <Button
                className="w-14 h-14 bg-red-400 rounded-full"
                onPress={() => handleAddToFavorites(book._id)}
              >
                <ButtonText>
                  <Icon as={HeartIcon} className="text-white" />
                </ButtonText>
              </Button>
            </View>
            <Button
              className="flex-1 bg-black h-16 rounded-full"
              onPress={() => {
                speak(`Bắt đầu đọc sách ${book.title}`);
                handleAddToHistory(book._id);
                setShowListenCard(true);
              }}
            >
              <ButtonText className="text-white">Đọc sách</ButtonText>
            </Button>
          </HStack>
        </View>
        {isShowListenCard && (
          <ListenCard
            book={book}
            isListenCardVisible={isShowListenCard}
            setListenCardVisible={setShowListenCard}
          />
        )}
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default BookCard;
