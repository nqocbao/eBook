import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { speak, stop, isSpeakingAsync } from "expo-speech";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@/components/ui/slider";
import { Audio } from "expo-av";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Box } from "@/components/ui/box";

// Interface cho dữ liệu sách
interface Book {
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
}

interface ListenCardProps {
  book: Book;
  isListenCardVisible: boolean;
  setListenCardVisible: (isListenCardVisible: boolean) => void;
}

const ListenCard: React.FC<ListenCardProps> = ({
  book,
  isListenCardVisible,
  setListenCardVisible,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(300); // Giả lập thời lượng 5 phút
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [currentText, setCurrentText] = useState<string | null>(null); // Dùng để hiển thị đoạn văn bản hiện tại

  // Nội dung mẫu để demo
  const sampleContent = book.description;

  // Thiết lập timer để giả lập việc phát âm thanh và cập nhật vị trí
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isListenCardVisible) {
      // Reset trạng thái khi mở card
      setPosition(0);
      setCurrentText(sampleContent || null);
    }

    if (isPlaying) {
      timer = setInterval(() => {
        setPosition((prevPosition) => {
          const newPosition = prevPosition + 1;
          if (newPosition >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return newPosition;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
      if (isPlaying) {
        stop();
      }
    };
  }, [isListenCardVisible, isPlaying]);

  // Dọn dẹp khi component unmount
  useEffect(() => {
    return () => {
      stop();
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const togglePlayPause = async () => {
    if (isPlaying) {
      // Tạm dừng
      stop();
      setIsPlaying(false);
    } else {
      // Phát âm thanh
      if (currentText) {
        speak(currentText, {
          language: "en",
          onDone: () => {
            // Nếu muốn tự động chuyển sang bản tiếng Việt sau khi đọc xong
            // speak(translatedText, { language: "vi" });
          },
        });
        setIsPlaying(true);
      }
    }
  };

  const handleSliderChange = (value: number) => {
    // GlueStack Slider trả về giá trị dưới dạng mảng, nên ta cần lấy phần tử đầu tiên
    const newPosition = typeof value === "number" ? value : value[0];
    setPosition(newPosition);
    // Nếu có audio file thực, bạn có thể tua đến vị trí này
  };

  const handleRewind = () => {
    setPosition(Math.max(0, position - 10));
  };

  const handleForward = () => {
    setPosition(Math.min(duration, position + 10));
  };

  if (!isListenCardVisible) return null;

  return (
    <Modal
      isOpen={isListenCardVisible}
      onClose={() => setListenCardVisible(false)}
      className="w-full h-full bg-slate-700"
    >
      <Image
        source={{
          uri: book.thumbnail,
        }}
        resizeMode="cover"
        className="absolute w-full h-full items-center justify-center  opacity-10 "
      />
      <ModalBackdrop />
      <ModalHeader>
        <View className="flex-row justify-between items-center w-full px-8 pt-16">
          <TouchableOpacity onPress={() => setListenCardVisible(false)}>
            <Feather name="chevron-down" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-medium">{book.author}</Text>
          <TouchableOpacity>
            <Feather name="maximize" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ModalHeader>
      <ModalContent className="h-4/5 bg-inherit border-0 rounded-lg px-4">
        <Text className="text-white text-base text-center mt-1 mb-2">
          Chapter 1
        </Text>

        <Box className="my-4 h-4/5 justify-center items-center">
          {/* ảnh book */}
          <View className="items-center mb-5">
            <View className="bg-gray-800 rounded-2xl overflow-hidden w-52 h-72">
              <Image
                source={{
                  uri: book.thumbnail || "https://via.placeholder.com/150",
                }}
                className="w-full h-full"
                resizeMode="stretch"
              />
            </View>
          </View>

          {/* nội dung */}
          <View className="w-11/12 my-4">
            <Text className="text-white text-base justify-center align-middle leading-6">
              {currentText}
            </Text>
          </View>
        </Box>
      </ModalContent>
      <ModalFooter>
        <View className="flex-row justify-center items-center w-full pb-16">
          <TouchableOpacity onPress={handleRewind}>
            <Feather name="rotate-ccw" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-20 h-20 rounded-full ${
              isPlaying ? `bg-blue-500` : `bg-green-400`
            } justify-center items-center mx-8`}
            onPress={togglePlayPause}
          >
            <Feather
              name={isPlaying ? "pause" : "play"}
              size={40}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForward}>
            <Feather name="rotate-cw" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ModalFooter>
    </Modal>
  );
};
export default ListenCard;
