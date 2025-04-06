"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

// import { API_URL } from "@/constants/api";
// import BookCard from "@/components/BookCard";
// import { useTTS } from "@/hooks/useTTS";
import { useTailwind } from "tailwind-rn";

export default function Library() {
  const tw = useTailwind();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  //   const { speak, stop } = useTTS();

  //   useEffect(() => {
  //     const fetchBooks = async () => {
  //       try {
  //         const [booksResponse, categoriesResponse] = await Promise.all([
  //           axios.get(`${API_URL}/books`),
  //           axios.get(`${API_URL}/categories`),
  //         ]);

  //         setBooks(booksResponse.data);
  //         setFilteredBooks(booksResponse.data);
  //         setCategories(categoriesResponse.data);
  //       } catch (error) {
  //         console.error("Error fetching books:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchBooks();

  //     // Announce screen for accessibility
  //     speak("Library screen. Browse and search for books.");

  //     return () => {
  //       stop();
  //     };
  //   }, []);

  //   useEffect(() => {
  //     filterBooks();
  //   }, [searchQuery, selectedCategory, books]);

  //   const filterBooks = () => {
  //     let filtered = [...books];

  //     // Filter by category
  //     if (selectedCategory !== "all") {
  //       filtered = filtered.filter((book) => book.category === selectedCategory);
  //     }

  //     // Filter by search query
  //     if (searchQuery) {
  //       filtered = filtered.filter(
  //         (book) =>
  //           book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //           book.author.toLowerCase().includes(searchQuery.toLowerCase())
  //       );
  //     }

  //     setFilteredBooks(filtered);
  //   };

  //   const handleCategorySelect = (category) => {
  //     setSelectedCategory(category);
  //     speak(`Selected category: ${category === "all" ? "All Books" : category}`);
  //   };

  //   const handleVoiceAssistance = () => {
  //     speak(
  //       "Library screen. Here you can browse and search for books. Use the search bar at the top to find books by title or author. Filter books by category using the category buttons. Double tap on a book to open it."
  //     );
  //   };

  if (loading) {
    return (
      <View style={tw("flex-1 justify-center items-center bg-gray-100")}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={tw("mt-4 text-gray-700")}>Loading books...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw("flex-1 bg-gray-100")}>
      <View
        style={tw("flex-row justify-between items-center px-4 py-3 bg-sky-700")}
      >
        <Text style={tw("text-2xl font-bold text-white")}>Library</Text>
        <TouchableOpacity
          //   onPress={handleVoiceAssistance}
          accessibilityLabel="Voice assistance"
          accessibilityHint="Activates voice guidance for navigation"
        >
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw("px-4 py-3")}>
        <View style={tw("flex-row items-center bg-white rounded-lg px-3 mb-4")}>
          <Feather name="search" size={20} color="gray" />
          <TextInput
            style={tw("flex-1 py-2 px-3")}
            placeholder="Search books by title or author"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search books"
            accessibilityHint="Enter book title or author name to search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x" size={20} color="gray" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* <FlatList
          horizontal
          data={[{ id: "all", name: "All Books" }, ...categories]}
            keyExtractor={(item) => item.id || item._id}
          showsHorizontalScrollIndicator={false}
          style={tw("mb-4")}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCategorySelect(item.id || item._id)}
                style={tw(
                  `mr-2 px-4 py-2 rounded-full ${
                    selectedCategory === (item.id || item._id)
                      ? "bg-sky-600"
                      : "bg-gray-200"
                  }`
                )}
                accessibilityLabel={item.name || item.title}
                accessibilityHint={`Select ${item.name || item.title} category`}
                accessibilityState={{
                  selected: selectedCategory === (item.id || item._id),
                }}
              >
                <Text
                  style={tw(
                    `${
                      selectedCategory === (item.id || item._id)
                        ? "text-white"
                        : "text-gray-800"
                    }`
                  )}
                >
                  {item.name || item.title}
                </Text>
              </TouchableOpacity>
            )}
        /> */}
      </View>

      {/* <FlatList
        data={filteredBooks}
        // keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={{ padding: 16 }}
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        // renderItem={({ item }) => (
        //   <BookCard
        //     book={item}
        //     onPress={() => router.push(`/book/${item._id}`)}
        //     gridView
        //   />
        // )}
        ListEmptyComponent={
          <View style={tw("flex-1 justify-center items-center py-8")}>
            <Feather name="book" size={48} color="gray" />
            <Text style={tw("mt-4 text-gray-500 text-center")}>
              No books found. Try adjusting your search or filters.
            </Text>
          </View>
        }
      /> */}
    </SafeAreaView>
  );
}
