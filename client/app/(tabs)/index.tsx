import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text as RNText,
  ImageBackground,
  Platform,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import Navbar from "../components/navbar";
import { speak } from "expo-speech";
import BookCard from "../components/BookCard";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { HeartIcon, PlayIcon } from "lucide-react-native";
import ListenCard from "../components/ListenCard";
import { API_URL } from "@/constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Category {
  _id: string;
  title: string;
  description: string;
  type: string;
  deleted: boolean;
}

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

export default function HomeScreen() {
  const [isBookCardVisible, setBookCardVisible] = useState(false);
  const [isListenCardVisible, setListenCardVisible] = useState(false);
  const [selectBook, setSelectedBook] = useState<Book | null>(null);
  const [recommended, setRecommended] = useState<Book[]>([]);
  const [newReleases, setNewReleases] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Debug log để kiểm tra render
  console.log("Rendering HomeScreen");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      // Xác định API URL tùy theo nền tảng
      try {
        const response = await fetch(`${API_URL}/api/client/books/`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setNewReleases(data.slice(0, 4)); // Lấy 4 sách mới xuất bản
        setRecommended(data.slice(5, 8)); // Lấy 4 sách gợi ý
      } catch (error) {
        console.log(API_URL);
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleReading = (book: Book) => {
    speak(`Đang chuyển hướng qua đọc sách ${book.title}.`);
    console.log(`Đọc sách: ${book.title}`);
    setSelectedBook(book);
    setListenCardVisible(true); // Hiển thị ListenCard khi nhấn "Nghe thử"
  };

  const handleAddToFavorites = async (doc_id: string) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.error("User is not logged in");
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
        console.error("Error adding to favorites:", data.message);
        alert(data.message || "Không thể thêm vào danh sách yêu thích.");
        return;
      }

      console.log("Book added to favorites:", data);
      alert(data.message || "Thêm vào danh sách yêu thích thành công!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
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
  // Giao diện khi đang tải
  if (loading) {
    console.log(API_URL);
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0284c7" />
          <RNText className="mt-4 text-gray-700">Đang tải...</RNText>
        </View>
      </SafeAreaView>
    );
  }

  // Giao diện khi có lỗi
  if (error) {
    function fetchData() {
      throw new Error("Failed to fetch Book Data.");
    }

    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <RNText className="text-red-500">{error}</RNText>
          <TouchableOpacity
            className="mt-4 bg-blue-500 px-4 py-2 rounded"
            onPress={() => {
              setLoading(true);
              fetchData();
            }}
          >
            <RNText className="text-white">Thử lại</RNText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <View className="w-full h-full">
      <SafeAreaView
        className="flex-1 bg-white"
        style={Platform.OS === "android" ? { paddingTop: 40 } : {}}
      >
        {/* Thanh header trên cùng */}
        <Navbar />

        {/* Khu vực nội dung chính */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Khối "Mới xuất bản" hoặc "Nổi bật" */}
          <View className="px-6 mt-2">
            <RNText className="text-lg font-bold text-gray-800 mb-4">
              Mới xuất bản
            </RNText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {newReleases.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  className="pr-4"
                  onPress={() => {
                    console.log("Xem chi tiết sách:", item.title);
                    setSelectedBook(item);
                    setBookCardVisible(true);
                  }}
                >
                  <View className="bg-white rounded-lg overflow-hidden w-72 h-96 mb-2 shadow-md">
                    <Image
                      source={{ uri: item.thumbnail }}
                      className="w-full h-full border-[1px] border-black rounded-lg"
                      resizeMode="stretch"
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
                  <TouchableOpacity
                    className="bg-green-400 justify-center rounded-xl mt-2 h-12 px-4 py-2"
                    onPress={() => {
                      console.log("Xem chi tiết sách...");
                      setSelectedBook(item);
                      setBookCardVisible(true);
                    }}
                  >
                    <RNText
                      className="text-white text-center font-semibold"
                      onPress={() => {
                        handleAddToHistory(item._id);
                        handleReading(item);
                      }}
                    >
                      Nghe thử
                    </RNText>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Danh sách đề xuất: "Tuyệt Cho Lần Nghe Đầu" */}
          <View className="px-6 mt-2">
            <Text className="text-lg font-bold text-gray-800 mt-8 my-4">
              Tuyệt Cho Lần Nghe Đầu
            </Text>

            <View className="w-full items-center justify-center">
              {recommended.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  className=" w-full"
                  onPress={() => {
                    console.log("Xem chi tiết sách:", item.title);
                    setSelectedBook(item);
                    setBookCardVisible(true);
                  }}
                >
                  <HStack space="sm" reversed={false} className="mb-4">
                    <View className=" rounded-lg overflow-hidden w-52 h-72 shadow-md">
                      <Image
                        source={{ uri: item.thumbnail }}
                        className="h-full w-full"
                        resizeMode="cover"
                        onError={() =>
                          console.log(`Failed to load image for ${item.title}`)
                        }
                      />
                    </View>
                    <VStack space="xs" className="w-full">
                      <VStack space="md" className="mt-10">
                        <RNText className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </RNText>
                        <RNText className="text-sm text-gray-500">
                          {item.author}
                        </RNText>
                        <RNText className="text-xs text-gray-600">
                          {/* Thể loại: {item.category.join(", ")}{" "} */}
                          {/* Hiển thị tất cả thể loại, cách nhau bởi dấu phẩy */}
                        </RNText>
                      </VStack>
                      <HStack className="gap-8 ml-7 items-center -bottom-24">
                        <Button
                          className="size-16 rounded-full bg-red-400"
                          size="sm"
                          onPress={() => handleAddToFavorites(item._id)}
                        >
                          <ButtonIcon as={HeartIcon}></ButtonIcon>
                        </Button>
                        <Button
                          className="size-16 rounded-full bg-green-400 hover:bg-green-800"
                          size="sm"
                          onPress={() => {
                            console.log("Xem chi tiết sách...");
                            setSelectedBook(item);
                            setListenCardVisible(true);
                          }}
                        >
                          <ButtonIcon as={PlayIcon}></ButtonIcon>
                        </Button>
                      </HStack>
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Hiển thị Book Card */}
          {isBookCardVisible && selectBook && (
            <BookCard
              isBookCardVisible={isBookCardVisible}
              setBookCardVisible={setBookCardVisible}
              book={selectBook!}
            />
          )}

          {/* Hiển thị Listen Card */}

          {selectBook && (
            <ListenCard
              book={selectBook}
              isListenCardVisible={isListenCardVisible}
              setListenCardVisible={setListenCardVisible}
            />
          )}

          {/* Khoảng trống để tránh bị che khuất bởi thanh tab bar */}
          <View className="h-20" />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
