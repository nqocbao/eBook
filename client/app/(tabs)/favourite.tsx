"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text as RNText,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/navbar";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BookCard from "../components/BookCard";
import { API_URL } from "@/constants/config";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

// Dữ liệu sách mẫu
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
// const books: Book[] = [
//   {
//     id: 1,
//     title: "Hoàng tử bé",
//     author: "Antoine de Saint-Exupéry",
//     cover:
//       "https://i.pinimg.com/736x/73/fe/f2/73fef2d17b9f311e713bee4bcba584d7.jpg",
//     pages: 150,
//     reads: "75.0K",
//     likes: "12.0K",
//     description: `Cuốn tiều thuyết The Little Prince - Hoàng tử bé kể về câu chuyện của một phi công bị rơi máy bay trong sa mạc Sahara và được chào đón bởi một cậu bé tuyền bồ minh là một hoàng tử nhỏ, từ một hành tinh khác đến...`,
//     category: ["Fantasy", "Drama"],
//   },
//   {
//     id: 2,
//     title: "48 Nguyên Tắc Chủ Chốt Của Quyền Lực",
//     author: "Robert Greene",
//     cover:
//       "https://i.pinimg.com/736x/93/07/1f/93071f129b107483d82d6a3019eeed84.jpg",
//     pages: 480,
//     reads: "69.5K",
//     likes: "10.0K",
//     description:
//       "Qua nghiên cứu lịch sử nhân loại, với những nhân vật có quyền lực nhất tự cổ chí kim, Robert Greene đã khái quát nên 48 nguyên tắc tạo nên quyền lực một cách có cơ sở khoa học...",
//     category: ["Other"],
//   },
//   {
//     id: 3,
//     title: "Tư Duy Nhanh Và Chậm",
//     author: "Daniel Kahneman",
//     cover:
//       "https://i.pinimg.com/736x/eb/58/a3/eb58a346f50d2d1776ac44657a6c1856.jpg",
//     pages: 512,
//     reads: "50.2K",
//     likes: "8.5K",
//     description:
//       "Cuốn sách Tư duy nhanh và chậm bàn sâu về sự sai lệch của trực giác, những giới hạn của đầu óc con người khi sử dụng phương pháp tư duy nhanh...",
//     category: ["Other"],
//   },
//   {
//     id: 4,
//     title: "Sapiens: Lược Sử Loài Người",
//     author: "Yuval Noah Harari",
//     cover:
//       "https://i.pinimg.com/736x/8e/fc/81/8efc816a45a3c671ad594240cb3368bf.jpg",
//     pages: 443,
//     reads: "75.0K",
//     likes: "12.0K",
//     description:
//       "“Sapiens: Lược sử loài người” đưa chúng ta vào một chuyến đi kinh ngạc qua toàn bộ lịch sử loài người, từ những gốc rễ tiến hóa của nó đến thời đại của chủ nghĩa tư bản và kỹ thuật di truyền...",
//     category: ["Other", "Drama"],
//   },
//   {
//     id: 5,
//     title: "Nhà Giả Kim",
//     author: "Paulo Coelho",
//     cover:
//       "https://i.pinimg.com/736x/e7/9b/61/e79b615c3277569a59e312943707eeae.jpg",
//     pages: 208,
//     reads: "90.0K",
//     likes: "15.0K",
//     description:
//       "Nhà Giả Kim kể về hành trình của Santiago, một chàng chăn cừu trẻ tuổi, đi tìm kho báu trong giấc mơ của mình. Cuốn sách là một câu chuyện đầy cảm hứng về việc theo đuổi ước mơ và khám phá ý nghĩa cuộc sống...",
//     category: ["Fantasy", "Other"],
//   },
//   {
//     id: 6,
//     title: "Đắc Nhân Tâm",
//     author: "Dale Carnegie",
//     cover:
//       "https://i.pinimg.com/736x/02/48/a5/0248a59ffaaa3dd9af4af897a9cbd1b2.jpg",
//     pages: 320,
//     reads: "120.0K",
//     likes: "20.0K",
//     description:
//       "Đắc Nhân Tâm là cuốn sách kinh điển về kỹ năng giao tiếp và xây dựng mối quan hệ. Tác giả Dale Carnegie chia sẻ những nguyên tắc giúp bạn thu phục lòng người và tạo ảnh hưởng trong xã hội...",
//     category: ["Other"],
//   },
//   {
//     id: 7,
//     title: "Harry Potter và Hòn Đá Phù Thủy",
//     author: "J.K. Rowling",
//     cover:
//       "https://i.pinimg.com/736x/fd/4a/7a/fd4a7afda9a5012d6f3dfe2775ada5e8.jpg",
//     pages: 309,
//     reads: "200.0K",
//     likes: "50.0K",
//     description:
//       "Harry Potter và Hòn Đá Phù Thủy là phần đầu tiên trong loạt truyện nổi tiếng của J.K. Rowling, kể về cuộc phiêu lưu của cậu bé phù thủy Harry Potter tại trường Hogwarts...",
//     category: ["Fantasy", "Drama"],
//   },
//   {
//     id: 8,
//     title: "Mắt Biếc",
//     author: "Nguyễn Nhật Ánh",
//     cover:
//       "https://i.pinimg.com/736x/53/64/cc/5364cc9cbaa995715bb51ff35d1b06ce.jpg",
//     pages: 250,
//     reads: "40.0K",
//     likes: "5.0K",
//     description:
//       "Mắt Biếc là một tác phẩm hài hước của Nguyễn Nhật Ánh, tái hiện những câu chuyện vui nhộn và đầy ý nghĩa về tuổi thơ và tình bạn...",
//     category: ["Comedy"],
//   },
//   {
//     id: 9,
//     title: "Bố Già",
//     author: "Mario Puzo",
//     cover:
//       "https://i.pinimg.com/736x/40/16/b8/4016b8e7ec052bf710501333940edd31.jpg",
//     pages: 448,
//     reads: "80.0K",
//     likes: "18.0K",
//     description:
//       "Bố Già là tiểu thuyết kinh điển về thế giới mafia Ý, kể về gia đình Corleone và những mưu đồ, quyền lực, tình thân trong thế giới ngầm...",
//     category: ["Drama"],
//   },
//   {
//     id: 10,
//     title: "Dune",
//     author: "Frank Herbert",
//     cover:
//       "https://i.pinimg.com/736x/1b/83/b7/1b83b7fd9aba1bc0a5087968dbe4ce70.jpg",
//     pages: 412,
//     reads: "60.0K",
//     likes: "14.0K",
//     description:
//       "Dune là một tiểu thuyết khoa học viễn tưởng kinh điển, kể về cuộc chiến giành quyền kiểm soát hành tinh sa mạc Arrakis, nơi có nguồn tài nguyên quý giá nhất vũ trụ...",
//     category: ["Fantasy", "Other"],
//   },
//   {
//     id: 11,
//     title: "Tôi Thấy Hoa Vàng Trên Cỏ Xanh",
//     author: "Nguyễn Nhật Ánh",
//     cover:
//       "https://i.pinimg.com/736x/77/8b/c6/778bc648a81f6403f7303b9908a9eafd.jpg",
//     pages: 376,
//     reads: "55.0K",
//     likes: "10.0K",
//     description:
//       "Tôi Thấy Hoa Vàng Trên Cỏ Xanh là câu chuyện cảm động về tuổi thơ, tình anh em và những kỷ niệm trong trẻo của Nguyễn Nhật Ánh...",
//     category: ["Drama", "Comedy"],
//   },
// ];

export default function FavouriteScreen() {
  const [historyBooks, setHistoryBooks] = useState<Book[]>([]);
  const [readingBooks, setReadingBooks] = useState<Book[]>([]);
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isBookCardVisible, setBookCardVisible] = useState(false);
  const [selectBook, setSelectedBook] = useState<Book | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const router = useRouter();

  console.log("Rendering FavouriteScreen");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    };
    checkToken();
  });

  const fetchData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Fetching bookData with token: ", token);

      const responseHistory = await fetch(`${API_URL}/api/client/history/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const responseReading = await fetch(
        `${API_URL}/api/client/reading-progress/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const responseFavorite = await fetch(`${API_URL}/api/client/favorites/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // nhả lỗi nếu fetch lỗi
      if (!responseHistory.ok) {
        throw new Error(`HTTP error! Status: ${responseHistory.status}`);
      }
      if (!responseReading.ok) {
        throw new Error(`HTTP error! Status: ${responseReading.status}`);
      }
      if (!responseFavorite.ok) {
        throw new Error(`HTTP error! Status: ${responseFavorite.status}`);
      }

      // lấy id cho từng hạng mục
      const historyData = await responseHistory.json();
      const sortedHistoryData = historyData.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      const bookIdHistory = sortedHistoryData.map((item: any) => item.book_id);

      const readingData = await responseReading.json();
      const bookIdReading = readingData.map((item: any) => item.doc_id);

      const favoriteData = await responseFavorite.json();
      const bookIdFavorite = favoriteData.map((item: any) => item.doc_id);

      console.log("Fetched history book IDs: ", bookIdHistory);
      console.log("Fetched reading book IDs: ", bookIdReading);
      console.log("Fetched book IDs: ", bookIdFavorite);

      const responseBooks = await fetch(`${API_URL}/api/client/books`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!responseBooks.ok) {
        throw new Error(`HTTP error! Status: ${responseBooks.status}`);
      }

      const allBooks = await responseBooks.json();

      // Lọc sách dựa trên danh sách id
      const filteredHistoryBooks = sortedHistoryData
        .map((historyItem: any) =>
          allBooks.find((book: any) => book._id === historyItem.book_id)
        )
        .filter((book: any) => book !== undefined);
      const filteredReadingBooks = allBooks.filter((book: any) =>
        bookIdReading.includes(book._id)
      );
      const filteredFavoriteBooks = allBooks.filter((book: any) =>
        bookIdFavorite.includes(book._id)
      );

      console.log("Filtered history books:", filteredHistoryBooks);
      console.log("Filtered reading books:", filteredReadingBooks);
      console.log("Filtered books:", filteredFavoriteBooks);

      // Lưu danh sách sách vào state
      setHistoryBooks(filteredHistoryBooks);
      setReadingBooks(filteredReadingBooks);
      setFavoriteBooks(filteredFavoriteBooks);
    } catch (err) {
      console.log("Error fetching data book: ", err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Thành phần hiển thị từng cuốn sách
  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="w-40 mr-4"
      onPress={() => {
        console.log("Xem chi tiết sách...");
        setSelectedBook(item);
        setBookCardVisible(true);
      }}
    >
      <View className="bg-white rounded-lg overflow-hidden h-72 shadow-md">
        <Image
          source={{ uri: item.thumbnail }}
          className="w-full h-56"
          resizeMode="stretch"
          onError={() =>
            console.log(`Không tải được hình ảnh cho ${item.title}`)
          }
        />
        <VStack className="p-2 justify-center items-center">
          <RNText className="text-sm font-semibold text-gray-800">
            {item.title.length > 15
              ? item.title.substring(0, 15) + "..."
              : item.title}
          </RNText>
          <RNText className="text-xs text-gray-500">
            {item.author.length > 15
              ? item.author.substring(0, 15) + "..."
              : item.author}
          </RNText>
        </VStack>
      </View>
    </TouchableOpacity>
  );

  // Thành phần hiển thị danh sách sách trong lịch sử
  const renderHistorySection = () => {
    if (historyBooks.length === 0) return null;

    return (
      <View className="mb-6">
        <RNText className="text-lg font-bold text-gray-800 px-4 mb-2">
          Lịch sử
        </RNText>
        <FlatList
          data={historyBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    );
  };

  // Thành phần hiển thị danh sách sách đang đọc
  const renderReadingSection = () => {
    if (readingBooks.length === 0) return null;

    return (
      <View className="mb-6">
        <RNText className="text-lg font-bold text-gray-800 px-4 mb-2">
          Đang đọc
        </RNText>
        <FlatList
          data={readingBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    );
  };

  // Thành phần hiển thị danh sách sách yêu thích
  const renderFavouriteSection = () => {
    if (favoriteBooks.length === 0) return null;

    return (
      <View className="mb-6">
        <RNText className="text-lg font-bold text-gray-800 px-4 mb-2">
          Yêu thích
        </RNText>
        <FlatList
          data={favoriteBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Thanh điều hướng */}
      <Navbar />

      <ScrollView showsVerticalScrollIndicator={false} className="pt-4">
        {/* Mục Lịch sử */}
        {renderHistorySection()}

        {/* Mục Đang đọc */}
        {renderReadingSection()}

        {/* Mục Yêu thích */}
        {renderFavouriteSection()}

        {isBookCardVisible && selectBook && (
          <BookCard
            isBookCardVisible={isBookCardVisible}
            setBookCardVisible={setBookCardVisible}
            book={selectBook!}
          />
        )}
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
