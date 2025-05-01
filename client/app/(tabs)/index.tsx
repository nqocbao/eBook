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
import axios from "axios";

// Danh sách chuyên mục (có thể load động từ API)
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

// Danh sách gợi ý (có thể load động từ API)
// const recommended: Book[] = [
//   {
//     id: 1,
//     title: "Hoàng tử bé",
//     author: "Antoine de Saint-Exupéry",
//     category: ["Fantasy", "Drama"],
//     cover:
//       "https://i.pinimg.com/736x/73/fe/f2/73fef2d17b9f311e713bee4bcba584d7.jpg",
//     pages: 150,
//     reads: "75.0K",
//     likes: "12.0K",
//     description: `Cuốn tiều thuyết The Little Prince - Hoàng tử bé kể về câu chuyện của một phi công bị rơi máy bay trong sa mạc Sahara và được chào đón bởi một cậu bé tuyền bồ minh là một hoàng tử nhỏ, từ một hành tinh khác đến...`,
//   },
//   {
//     id: 2,
//     title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
//     author: "Robert Greene",
//     category: ["Other"],
//     cover:
//       "https://i.pinimg.com/736x/93/07/1f/93071f129b107483d82d6a3019eeed84.jpg",
//     pages: 480,
//     reads: "69.5K",
//     likes: "10.0K",
//     description:
//       "Qua nghiên cứu lịch sử nhân loại, với những nhân vật có quyền lực nhất tự cổ chí kim, Robert Greene đã khái quát nên 48 nguyên tắc tạo nên quyền lực một cách có cơ sở khoa học...",
//   },
//   {
//     id: 3,
//     title: "Tư Duy Nhanh Và Chậm",
//     author: "Daniel Kahneman",
//     category: ["Other"],
//     cover:
//       "https://i.pinimg.com/736x/eb/58/a3/eb58a346f50d2d1776ac44657a6c1856.jpg",
//     pages: 512,
//     reads: "50.2K",
//     likes: "8.5K",
//     description:
//       "Cuốn sách Tư duy nhanh và chậm bàn sâu về sự sai lệch của trực giác, những giới hạn của đầu óc con người khi sử dụng phương pháp tư duy nhanh...",
//   },
//   {
//     id: 4,
//     title: "Sapiens: Lược Sử Loài Người",
//     author: "Yuval Noah Harari",
//     category: ["Other", "Drama"],
//     cover:
//       "https://i.pinimg.com/736x/8e/fc/81/8efc816a45a3c671ad594240cb3368bf.jpg",
//     pages: 443,
//     reads: "75.0K",
//     likes: "12.0K",
//     description:
//       "“Sapiens: Lược sử loài người” đưa chúng ta vào một chuyến đi kinh ngạc qua toàn bộ lịch sử loài người, từ những gốc rễ tiến hóa của nó đến thời đại của chủ nghĩa tư bản và kỹ thuật di truyền...",
//   },
// ];

// // Danh sách sách mới xuất bản (cập nhật thêm thông tin)
// const newReleases: Book[] = [
//   {
//     id: 1,
//     title: "Hoàng tử bé",
//     author: "Antoine de Saint-Exupéry",
//     category: ["Fantasy", "Drama"],
//     cover:
//       "https://i.pinimg.com/736x/73/fe/f2/73fef2d17b9f311e713bee4bcba584d7.jpg",
//     pages: 150,
//     reads: "75.0K",
//     likes: "12.0K",
//     description: `Cuốn tiều thuyết The Little Prince - Hoàng tử bé kể về câu chuyện của một phi công bị rơi máy bay trong sa mạc Sahara và được chào đón bởi một cậu bé tuyền bồ minh là một hoàng tử nhỏ, từ một hành tinh khác đến...`,
//   },
//   {
//     id: 2,
//     title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
//     author: "Robert Greene",
//     category: ["Other"],
//     cover:
//       "https://i.pinimg.com/736x/93/07/1f/93071f129b107483d82d6a3019eeed84.jpg",
//     pages: 480,
//     reads: "69.5K",
//     likes: "10.0K",
//     description:
//       "Qua nghiên cứu lịch sử nhân loại, với những nhân vật có quyền lực nhất tự cổ chí kim, Robert Greene đã khái quát nên 48 nguyên tắc tạo nên quyền lực một cách có cơ sở khoa học...",
//   },
//   {
//     id: 3,
//     title: "Tư Duy Nhanh Và Chậm",
//     author: "Daniel Kahneman",
//     category: ["Other"],
//     cover:
//       "https://i.pinimg.com/736x/eb/58/a3/eb58a346f50d2d1776ac44657a6c1856.jpg",
//     pages: 512,
//     reads: "50.2K",
//     likes: "8.5K",
//     description:
//       "Cuốn sách Tư duy nhanh và chậm bàn sâu về sự sai lệch của trực giác, những giới hạn của đầu óc con người khi sử dụng phương pháp tư duy nhanh...",
//   },
//   {
//     id: 4,
//     title: "Sapiens: Lược Sử Loài Người",
//     author: "Yuval Noah Harari",
//     category: ["Other", "Drama"],
//     cover:
//       "https://i.pinimg.com/736x/8e/fc/81/8efc816a45a3c671ad594240cb3368bf.jpg",
//     pages: 443,
//     reads: "75.0K",
//     likes: "12.0K",
//     description:
//       "“Sapiens: Lược sử loài người” đưa chúng ta vào một chuyến đi kinh ngạc qua toàn bộ lịch sử loài người, từ những gốc rễ tiến hóa của nó đến thời đại của chủ nghĩa tư bản và kỹ thuật di truyền...",
//   },
// ];

export default function HomeScreen() {
  const [isBookCardVisible, setBookCardVisible] = useState(false);
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
      try {
        const response = await fetch("http://10.0.2.2:5000/api/client/books/");
        const data = await response.json();
        setNewReleases(data.slice(0, 4)); // Lấy 4 sách mới xuất bản
        setRecommended(data.slice(5, 8)); // Lấy 4 sách gợi ý
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleReading = (book: any) => {
    speak(`Đang chuyển hướng qua đọc sách ${book.title}.`);
    console.log(`Đọc sách: ${book.title}`);
  };
  // Giao diện khi đang tải
  if (loading) {
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
    <SafeAreaView
      className="flex-1 bg-white"
      style={Platform.OS === "android" ? { paddingTop: 40 } : {}}
    >
      <View className="w-full h-full">
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
                  onPress={() => console.log("Xem chi tiết sách:", item.title)}
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
                    <RNText className="text-white text-center font-semibold">
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
                  onPress={() => console.log("Xem chi tiết sách:", item.title)}
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
                        >
                          <ButtonIcon as={HeartIcon}></ButtonIcon>
                        </Button>
                        <Button
                          className="size-16 rounded-full bg-green-400 hover:bg-green-800"
                          size="sm"
                          onPress={() => {
                            console.log("Xem chi tiết sách...");
                            setSelectedBook(item);
                            setBookCardVisible(true);
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
          {/* Khoảng trống để tránh bị che khuất bởi thanh tab bar */}
          <View className="h-20" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
