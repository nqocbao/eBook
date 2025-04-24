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
import Navbar from "../components/navbar";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SearchIcon } from "@/components/ui/icon";

// import { API_URL } from "@/constants/api";
// import NewsCard from "@/components/NewsCard";
// import { useTTS } from "@/hooks/useTTS";

export default function News() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0284c7" />
        <Text className="mt-4 text-gray-700">Loading news...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Navbar />

      <View className="px-4 py-3">
        <View className="flex-row items-center bg-white rounded-lg px-3 mb-4">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            className="flex-1 py-2 px-3"
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
      </View>
      <Input>
        <InputSlot className="pl-3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField placeholder="Search..." />
      </Input>
    </SafeAreaView>
  );
}
