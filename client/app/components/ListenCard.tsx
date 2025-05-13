import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { speak, stop, isSpeakingAsync } from "expo-speech";
import { Audio } from "expo-av";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Box } from "@/components/ui/box";
import { API_URL } from "@/constants/config";
import { NetworkInfo } from "react-native-network-info";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSpeechRate } from "../contexts/SpeechRateContext";

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
  const [currentIndex, setCurrentIndex] = useState(0); // Chỉ số file audio hiện tại
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [audioUrls, setAudioUrls] = useState<string[]>([]); // Danh sách URL file audio
  const [audioCache, setAudioCache] = useState<{ [index: number]: string }>({});
  const [currentText, setCurrentText] = useState<string | null>(null);
  const [currentChapter, setCurrentChapter] = useState<string>("Chương 1");
  const [chunks, setChunks] = useState<string[]>([]);
  const [readingProgress, setReadingProgress] = useState<{
    currentPage: number;
  } | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { speechRate } = useSpeechRate();

  const transferSpeed = (rate: String) => {
    if (rate === "0.5") return "slow";
    if (rate === "1") return "normal";
    if (rate === "1.5") return "fast";
    if (rate === "2") return "very_fast";
    return "normal";
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    if (isListenCardVisible) checkLogin();
  }, [isListenCardVisible]);

  // Nội dung mẫu để demo
  const sampleContent = book.content || "";

  // Hàm chia nội dung đoạn thành các đoạn 10 từ
  const splitContentIntoChunks = (content: string) => {
    // Sử dụng dấu câu để tách nội dung thành các câu
    const sentences = content.split(/(?<=[.?!])\s+/); // Tách dựa trên dấu chấm, dấu hỏi, hoặc dấu chấm than
    return sentences.filter((sentence) => sentence.trim() !== ""); // Loại bỏ các câu rỗng
  };

  // render & reload tiêu đề
  useEffect(() => {
    if (currentText) {
      const match = currentText.match(/Chương\s\d+/i); // Tìm "Chương 1", "Chương 2", ...
      if (match) {
        setCurrentChapter(match[0]); // Cập nhật tiêu đề chương
      }
    }
  }, [currentText]);

  // Khi mở ListenCard, chia sẵn các đoạn
  useEffect(() => {
    if (isListenCardVisible) {
      const c = splitContentIntoChunks(sampleContent);
      setChunks(c);
      setCurrentIndex(0);
      setCurrentText(c[0] || null);
      setIsPlaying(false);
      setAudioCache({});
      if (sound) sound.unloadAsync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListenCardVisible]);

  // Hàm giả lập lấy danh sách file audio từ API
  const fetchAudioUrl = async (index: number) => {
    if (!chunks[index]) return null;
    try {
      const response = await fetch(
        `http://192.168.1.171:5004/tts?text=${encodeURIComponent(
          chunks[index]
        )}&speed=${transferSpeed(speechRate)}`,
        { method: "GET" }
      );
      if (!response.ok) throw new Error("Failed to fetch audio");
      const data = await response.json();
      return data.audio_url;
    } catch (error) {
      console.error("Error fetching audio:", error);
      return null;
    }
  };

  // Hàm preload audio cho các index truyền vào
  const preloadAudio = async (indexes: number[]) => {
    setAudioCache((prev) => {
      const newCache = { ...prev };
      indexes.forEach((i) => {
        if (chunks[i] && !newCache[i]) {
          // Đánh dấu là đang fetch để tránh fetch trùng
          newCache[i] = "__loading__";
        }
      });
      return newCache;
    });

    for (const i of indexes) {
      if (chunks[i] && !audioCache[i]) {
        const url = await fetchAudioUrl(i);
        if (url) {
          setAudioCache((prev) => ({ ...prev, [i]: url }));
        }
      }
    }
  };

  // Hàm phát audio tại index
  const playAudioAtIndex = async (index: number) => {
    if (!chunks[index]) return;

    setCurrentText(chunks[index]);

    let url = audioCache[index];
    if (!url || url === "__loading__") {
      url = await fetchAudioUrl(index);
      if (url) setAudioCache((prev) => ({ ...prev, [index]: url }));
    }
    if (!url || url === "__loading__") return;

    if (sound) await sound.unloadAsync();

    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);

    // Preload 2 đoạn tiếp theo
    preloadAudio([index + 1, index + 2]);
  };

  // Khi audio phát xong, tự động phát đoạn tiếp theo
  const onPlaybackStatusUpdate = (status: any) => {
    if (status.didJustFinish) {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next < chunks.length) {
          playAudioAtIndex(next);
        } else {
          setIsPlaying(false);
        }
        return next;
      });
    }
  };

  // Khi nhấn play/pause
  const togglePlayPause = async () => {
    if (isPlaying) {
      if (sound) await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      playAudioAtIndex(currentIndex);
    }
  };

  // Dọn dẹp khi unmount
  useEffect(() => {
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

  // Xử lý tua lại 1 đoạn (rewind)
  const handleRewind = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => {
        playAudioAtIndex(prev - 1);
        return prev - 1;
      });
    }
  };

  // Xử lý tua tới 1 đoạn (forward)
  const handleForward = () => {
    if (currentIndex < chunks.length - 1) {
      setCurrentIndex((prev) => {
        playAudioAtIndex(prev + 1);
        return prev + 1;
      });
    }
  };

  const saveProgress = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("User is not logged in");
        speak("Bạn cần đăng nhập để thêm vào tiến trình đọc");
        alert("Bạn cần đăng nhập để thêm vào tiến trình đọc");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/client/reading-progress/add/${book._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPage: currentIndex,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log("Error adding to favorites:", data.message);
        speak(data.message || "Không thể thêm vào danh sách tiến trình đọc");
        alert(data.message || "Không thể thêm vào danh sách tiến trình đọc!");
        return;
      }

      console.log("Book added to favorites:", data);
      speak("Đã thêm vào danh sách tiến trình đọc");
      alert("Đã thêm vào danh sách tiến trình đọc!");
      // Có thể thêm thông báo thành công ở đây nếu muốn
    } catch (error) {
      console.error("Lỗi khi lưu tiến trình:", error);
    }
  };

  useEffect(() => {
    const fetchReadingProgress = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        const response = await fetch(
          `${API_URL}/api/client/reading-progress/detail/${book._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (
          response.ok &&
          data.progress &&
          typeof data.progress.currentPage === "number"
        ) {
          setReadingProgress({ currentPage: data.progress.currentPage });
        } else {
          setReadingProgress(null);
        }
      } catch (error) {
        setReadingProgress(null);
      }
    };

    if (isListenCardVisible) {
      fetchReadingProgress();
    }
  }, [isListenCardVisible, book._id]);

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
        className="absolute w-full h-full items-center justify-center opacity-10 "
      />
      <ModalBackdrop className="h-full w-full" />
      <ModalHeader className="flex-col">
        <View className="flex-row justify-between items-center w-full px-8 pt-20">
          <TouchableOpacity onPress={() => setListenCardVisible(false)}>
            <Feather name="chevron-down" size={30} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-medium">{book.author}</Text>
          <TouchableOpacity>
            <Feather name="maximize" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-white text-base text-center mb-2">
          {currentChapter}
        </Text>
      </ModalHeader>
      <ModalContent className="h-4/5 bg-transparent border-0 rounded-lg px-4">
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
          <View className="w-11/12 mt-14 ">
            <Text
              className="text-white text-base leading-6"
              style={{ textAlign: "center" }}
            >
              {currentText}
            </Text>

            {isLoggedIn && (
              <View className="flex-row justify-center mt-32 items-center w-full">
                <TouchableOpacity
                  onPress={saveProgress}
                  className="w-40 h-14 bg-[#94B4C1] rounded-lg py-2 px-4 flex-row items-center justify-center mx-2"
                >
                  <Feather
                    name="save"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-white text-base">Lưu tiến trình</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    if (
                      readingProgress &&
                      typeof readingProgress.currentPage === "number"
                    ) {
                      setCurrentIndex(readingProgress.currentPage);
                      setIsPlaying(true);
                      playAudioAtIndex(readingProgress.currentPage);
                    } else {
                      alert("Sách chưa có tiến trình đọc!");
                      speak("Sách chưa có tiến trình đọc!");
                      console.log(readingProgress);
                    }
                  }}
                  className="w-40 h-14 bg-[#213448] rounded-lg py-2 px-4 flex-row items-center justify-center mx-2"
                >
                  <Feather
                    name="play-circle"
                    size={20}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text className="text-white text-base">Tiếp tục đọc</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Box>
      </ModalContent>
      <ModalFooter>
        <View className="flex-row justify-center items-center w-full h-32 pb-20">
          <TouchableOpacity onPress={handleRewind}>
            <Feather name="rotate-ccw" size={30} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className={`w-24 h-24 rounded-full ${
              isPlaying ? `bg-red-500` : `bg-green-400`
            } justify-center items-center mx-8`}
            onPress={togglePlayPause}
          >
            <Feather
              name={isPlaying ? "pause" : "play"}
              size={42}
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
