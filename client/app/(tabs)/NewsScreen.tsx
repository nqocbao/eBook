"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

// import { API_URL } from "@/constants/api";
// import NewsCard from "@/components/NewsCard";
// import { useTTS } from "@/hooks/useTTS";
import { useTailwind } from "tailwind-rn";

export default function News() {
  const tw = useTailwind();
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  //   const { speak, stop } = useTTS();

  //   useEffect(() => {
  //     const fetchNews = async () => {
  //       try {
  //         const [newsResponse, categoriesResponse] = await Promise.all([
  //           axios.get(`${API_URL}/news`),
  //           axios.get(`${API_URL}/news/categories`),
  //         ]);

  //         setNews(newsResponse.data);
  //         setCategories(categoriesResponse.data);
  //       } catch (error) {
  //         console.error("Error fetching news:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchNews();

  //     // Thông báo màn hình cho hỗ trợ truy cập
  //     speak("News screen. Browse latest news articles.");

  //     return () => {
  //       stop();
  //     };
  //   }, []);

  //   const filteredNews =
  //     selectedCategory === "all"
  //       ? news
  //       : news.filter((item) => item.category === selectedCategory);

  //   const handleCategorySelect = (category) => {
  //     setSelectedCategory(category);
  //     speak(`Selected category: ${category === "all" ? "All News" : category}`);
  //   };

  //   const handleVoiceAssistance = () => {
  //     speak(
  //       "News screen. Here you can browse the latest news articles. Filter news by category using the category buttons at the top. Double tap on a news article to read it."
  //     );
  //   };

  if (loading) {
    return (
      <View style={tw("flex-1 justify-center items-center bg-gray-100")}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={tw("mt-4 text-gray-700")}>Loading news...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw("flex-1 bg-gray-100")}>
      <View
        style={tw("flex-row justify-between items-center px-4 py-3 bg-sky-700")}
      >
        <Text style={tw("text-2xl font-bold text-white")}>News</Text>
        <TouchableOpacity
          //   onPress={handleVoiceAssistance}
          accessibilityLabel="Voice assistance"
          accessibilityHint="Activates voice guidance for navigation"
        >
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={tw("px-4 py-3")}>
        {/* <FlatList
          horizontal
          data={[{ id: "all", name: "All News" }, ...categories]}
          keyExtractor={(item) => item.id || item._id}
          showsHorizontalScrollIndicator={false}
          style={tw("mb-4")}
          renderItem={({ item }) => (
            <TouchableOpacity
            //   onPress={() => handleCategorySelect(item.id || item._id)}
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
        // data={filteredNews}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 16 }}
        // renderItem={({ item }) => (
        //   <NewsCard news={item} onPress={() => router.push(`/news/${item._id}`)} />
        // )}
        ListEmptyComponent={
          <View style={tw("flex-1 justify-center items-center py-8")}>
            <Feather name="file-text" size={48} color="gray" />
            <Text style={tw("mt-4 text-gray-500 text-center")}>
              No news articles found in this category.
            </Text>
          </View>
        }
      /> */}
    </SafeAreaView>
  );
}
