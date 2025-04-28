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
// Hàm TTS
const speak = (text: string): void => {
  Speech.speak(text, { language: "vi" });
};

// Định nghĩa kiểu cho props
interface BookCardProps {
  isBookCardVisible: boolean;
  setBookCardVisible: (isBookCardVisible: boolean) => void;
  book: {
    id: number;
    title: string;
    author: string;
    cover: string;
    pages?: number;
    reads?: string;
    likes?: string;
    description?: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({
  isBookCardVisible,
  setBookCardVisible,
  book,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavorite = () => {
    setIsFavorited((prev) => {
      const newState = !prev;
      speak(
        newState
          ? `Đã thêm ${book.title} vào mục yêu thích`
          : `Đã bỏ ${book.title} khỏi mục yêu thích`
      );
      console.log(
        newState
          ? `Đã thêm ${book.title} vào mục yêu thích`
          : `Đã bỏ ${book.title} khỏi mục yêu thích`
      );
      return newState;
    });
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
            uri: book.cover,
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
                  uri: book.cover,
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
              <Text className="font-bold">{book.pages}</Text>
              <Text className="text-xs text-gray-500">Trang</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">{book.reads}</Text>
              <Text className="text-xs text-gray-500">Lượt đọc</Text>
            </VStack>
            <VStack className="items-center">
              <Text className="font-bold">{book.likes}</Text>
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
        <View className="absolute bottom-20 left-0 right-0 px-4">
          <HStack space="md" className="justify-center">
            <View className="w-20 items-center justify-center">
              <Button className="size-7 bg-transparent">
                <ButtonText>
                  <Icon as={HeartIcon} className="text-gray-500" />
                </ButtonText>
              </Button>
            </View>
            <Button className="flex-1 bg-black h-14 rounded-full">
              <ButtonText className="text-white">Tải sách</ButtonText>
            </Button>
          </HStack>
        </View>
      </ActionsheetContent>
    </Actionsheet>
  );
};

export default BookCard;
