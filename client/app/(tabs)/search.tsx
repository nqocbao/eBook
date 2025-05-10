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
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Navbar from "../components/navbar";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import BookCard from "../components/BookCard";
import { API_URL } from "@/constants/config";

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
export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isBookCardVisible, setBookCardVisible] = useState(false);
  const [selectBook, setSelectedBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log("Rendering SearchScreen");

  // Lọc sách khi tìm kiếm
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      // Xác định API URL tùy theo nền tảng
      try {
        const booksResponse = await fetch(`${API_URL}/api/client/books/`);
        const categoriesResponse = await fetch(
          `${API_URL}/api/client/categories/`
        );
        const booksData = await booksResponse.json();
        const categoriesData = await categoriesResponse.json();
        setBooks(booksData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();

    if (!searchQuery) {
      setFilteredBooks([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = books.filter((book) => {
      const matchesTitle = book.title.toLowerCase().includes(query);
      const matchesAuthor = book.author.toLowerCase().includes(query);
      const nameCategory = book.category_id.map((catId) => {
        const category = categories.find((cat) => cat._id === catId);
        return category ? category.title.toLowerCase() : "";
      });
      const matchesCategory = nameCategory.some((cat) => cat.includes(query));
      return matchesTitle || matchesAuthor || matchesCategory;
    });

    setFilteredBooks(filtered);
  }, [searchQuery]);

  // Giao diện khi đang tải
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0284c7" />
        <Text className="mt-4 text-gray-700">Đang tải...</Text>
      </View>
    );
  }

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
          resizeMode="cover"
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

  // Thành phần hiển thị danh sách sách theo thể loại
  const renderCategorySection = (category: Category) => {
    const booksInCategory = books.filter((book) =>
      category.title === "All" ? true : book.category_id.includes(category._id)
    );

    if (booksInCategory.length === 0) return null;

    return (
      <View className="mb-6">
        <RNText className="text-lg font-bold text-gray-800 px-4 mb-2">
          {category.title === "All" ? "Tất cả sách" : category.title}
        </RNText>
        <FlatList
          data={booksInCategory}
          renderItem={renderBookItem}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    );
  };

  // Thành phần hiển thị kết quả tìm kiếm
  const renderSearchResultItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      className="w-full my-2"
      onPress={() => {
        console.log("Xem chi tiết sách...");
        setSelectedBook(item);
        setBookCardVisible(true);
      }}
    >
      <HStack space="md" className="items-center px-4">
        <View className="bg-black rounded-lg overflow-hidden h-64 w-48 shadow-lg">
          <Image
            source={{ uri: item.thumbnail }}
            className="h-full w-full"
            resizeMode="stretch"
            onError={() =>
              console.log(`Không tải được hình ảnh cho ${item.title}`)
            }
          />
        </View>
        <VStack space="sm" className="flex-1">
          <RNText className="text-sm font-semibold text-gray-800">
            {item.title}
          </RNText>
          <RNText className="text-xs text-gray-500">{item.author}</RNText>
          <HStack space="xs">
            {item.category_id.map((cat, index) => (
              <View key={index} className="bg-gray-200 rounded-full px-2 py-1">
                <RNText className="text-xs text-gray-700">{cat}</RNText>
              </View>
            ))}
          </HStack>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Thanh điều hướng */}
      <Navbar />

      {/* Thanh tìm kiếm */}
      <View className="px-4 py-3">
        <Input className="bg-white rounded-lg h-14">
          <InputSlot className="pl-2">
            <InputIcon as={SearchIcon} className="text-gray-500 size-10" />
          </InputSlot>
          <InputField
            placeholder="Tìm kiếm sách"
            value={searchQuery}
            className="pl-2"
            onChangeText={setSearchQuery}
            accessibilityLabel="Tìm kiếm sách"
            accessibilityHint="Nhập tiêu đề, tác giả hoặc thể loại để tìm kiếm"
          />
          {searchQuery ? (
            <InputSlot className="pr-3">
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Feather name="x" size={20} color="gray" />
              </TouchableOpacity>
            </InputSlot>
          ) : null}
        </Input>
      </View>

      {/* Nội dung chính */}
      {searchQuery ? (
        // Khi có từ khóa tìm kiếm: hiển thị danh sách kết quả tìm kiếm
        <FlatList
          data={filteredBooks}
          renderItem={renderSearchResultItem}
          keyExtractor={(item) => item._id.toString()}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-10">
              <RNText className="text-gray-500">
                Không tìm thấy sách nào phù hợp.
              </RNText>
            </View>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      ) : (
        // Khi không có từ khóa tìm kiếm: hiển thị sách theo thể loại
        <ScrollView showsVerticalScrollIndicator={false}>
          {categories.map((category) => (
            <View key={category._id}>{renderCategorySection(category)}</View>
          ))}
          <View className="h-20" />
        </ScrollView>
      )}
      {isBookCardVisible && selectBook && (
        <BookCard
          isBookCardVisible={isBookCardVisible}
          setBookCardVisible={setBookCardVisible}
          book={selectBook!}
        />
      )}
    </SafeAreaView>
  );
}
