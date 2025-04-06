"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import { useTailwind } from "tailwind-rn";

// import { API_URL } from "@/constants/api"
// import BookCard from "@/components/BookCard"
// import NewsCard from "@/components/NewsCard"
// import { useTTS } from "@/hooks/useTTS"

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const tw = useTailwind();

  if (loading) {
    return (
      <View style={tw("flex-1 justify-center items-center bg-gray-100")}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={tw("mt-4 text-blue-700")}>Loading content...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={tw("flex-1 bg-gray-100")}>
      <View
        style={tw("flex-row justify-between items-center px-4 py-3 bg-sky-700")}
      >
        <Text style={tw("text-2xl font-bold text-white")}>eBook Reader</Text>
        <TouchableOpacity
          accessibilityLabel="Voice assistance"
          accessibilityHint="Activates voice guidance for navigation"
        >
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw("flex-1 px-4 py-6")}>
        <View style={tw("mb-8")}>
          <View style={tw("flex-row justify-between items-center mb-4")}>
            <Text style={tw("text-xl font-bold text-gray-800")}>
              Featured Books
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={tw("space-x-4")}
          ></ScrollView>
        </View>

        <View>
          <View style={tw("flex-row justify-between items-center mb-4")}>
            <Text style={tw("text-xl font-bold text-gray-800")}>
              Latest News
            </Text>
            <TouchableOpacity
              accessibilityLabel="View all news"
              accessibilityHint="Navigate to the news screen"
            >
              <Text style={tw("text-sky-600")}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={tw("space-y-4")}></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
function useTailWind() {
  throw new Error("Function not implemented.");
}
