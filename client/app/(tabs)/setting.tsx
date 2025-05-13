"use client";

import { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Nav } from "@expo/html-elements";
import Navbar from "../components/navbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { speak } from "expo-speech";
import { useSpeechRate } from "../contexts/SpeechRateContext";
import { useReadingMode } from "../contexts/ReadingModeContext";

const speechRates = [
  { label: "Chậm", value: 0.5 },
  { label: "Bình thường", value: 1 },
  { label: "Nhanh", value: 1.5 },
  { label: "Rất nhanh", value: 2 },
];

export default function Setting() {
  const [settings, setSettings] = useState({
    autoReadEnabled: true,

    speechRate: 1.0,
    voiceType: "default",
  });
  const { speechRate, setSpeechRate } = useSpeechRate();
  const { readingEnabled, setReadingEnabled } = useReadingMode();

  useEffect(() => {
    AsyncStorage.getItem("speechRate").then((rate) => {
      if (rate) setSpeechRate(rate);
    });
  }, []);

  // Khi thay đổi tốc độ đọc:
  const handleChangeSpeechRate = async (value: number) => {
    setSettings((prev) => ({ ...prev, speechRate: value }));
    setSpeechRate(value.toString());
    await AsyncStorage.setItem("speechRate", value.toString());
    console.log(value.toString());
  };

  const handleTestVoice = () => {
    speak("Đây là ví dụ đọc thử với tốc độ bạn đã chọn.", {
      rate: parseFloat(speechRate),
      language: "vi-VN",
    });
  };

  const handleResetSettings = async () => {
    const defaultSettings = {
      autoReadEnabled: true,
      speechRate: 1.0,
      voiceType: "default",
    };
    setSettings(defaultSettings);
    setSpeechRate("1.0");
    setReadingEnabled(true);
    await AsyncStorage.setItem("speechRate", "1.0");
    await AsyncStorage.setItem("readingEnabled", "true");
    // Nếu bạn lưu các setting khác vào AsyncStorage, hãy reset chúng ở đây
  };

  return (
    <SafeAreaView
      className="flex-1 bg-gray-100"
      style={Platform.OS === "android" ? { paddingTop: 40 } : {}}
    >
      <Navbar />

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-white rounded-lg overflow-hidden mb-6">
          <Text className="px-4 py-2 bg-gray-200 font-bold">
            Reading Preferences
          </Text>

          <View className="px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
            <View>
              <Text className="font-medium text-gray-800">Screen Reader</Text>
              <Text className="text-sm text-gray-500">
                Tự động đọc nội dung khi được mở lên
              </Text>
            </View>
            <Switch
              value={readingEnabled}
              onValueChange={setReadingEnabled}
              trackColor={{ false: "#94B4C1", true: "#213448" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
            />
          </View>
        </View>

        <View className="bg-white rounded-lg overflow-hidden mb-6">
          <Text className="px-4 py-2 bg-gray-200 font-bold">
            Voice Settings
          </Text>

          <View className="flex-row justify-between items-center h-28 mt-2">
            {speechRates.map((rate) => (
              <TouchableOpacity
                key={rate.value}
                onPress={() => handleChangeSpeechRate(rate.value)}
                className={` flex-1 h-14 w-20 justify-center items-center rounded-full mx-1 ${
                  settings.speechRate === rate.value
                    ? "bg-secondary"
                    : "bg-gray-200"
                }`}
              >
                <Text
                  className={`${
                    settings.speechRate === rate.value
                      ? "text-white"
                      : "text-gray-800"
                  } text-xs`}
                >
                  {rate.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            className="px-4 py-3 flex-row items-center"
            accessibilityLabel="Test voice"
            accessibilityHint="Play a sample of the text-to-speech voice"
            onPress={handleTestVoice}
          >
            <Feather name="play" size={20} color="#547792" className="mr-2" />
            <Text className="text-primary font-medium">Test Voice</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-lg py-3 mb-8"
          accessibilityLabel="Reset all settings"
          accessibilityHint="Reset all settings to their default values"
          onPress={handleResetSettings}
        >
          <Text className="text-white font-bold text-center">
            Thiết lập tại mặc định
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
