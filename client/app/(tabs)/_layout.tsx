import { Tabs, useFocusEffect } from "expo-router";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Platform,
  ViewStyle,
} from "react-native";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SpeechRateProvider,
  useSpeechRate,
} from "../contexts/SpeechRateContext";
import { useReadingMode } from "../contexts/ReadingModeContext";

// Fallback for TTS on web
const speak = (text: string, options?: Speech.SpeechOptions): void => {
  if (Platform.OS !== "web") {
    Speech.speak(text, { language: "vi", ...options });
  } else {
    console.log(`TTS on web: ${text}`);
  }
};

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight as any}
        className="flex flex-row w-full min-w-[112px] min-h-20 mt-9 justify-center items-center rounded-full overflow-hidden"
        accessible
        accessibilityLabel={title}
        accessibilityRole="button"
      >
        <Image source={icon} tintColor="#ECEFCA" className="size-6" />
        <Text className="text-error text-base font-semibold ml-2">{title}</Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-8 rounded-full">
      <Image source={icon} tintColor="#ECEFCA" className="size-6" />
    </View>
  );
}

export default function TabsLayout() {
  const [lastSpokenTab, setLastSpokenTab] = useState<string | null>(null); // Theo dõi tab đã được đọc TTS
  const { speechRate } = useSpeechRate();
  const { readingEnabled } = useReadingMode();

  const handleTabPress = (title: string) => {
    // Chỉ đọc TTS nếu tab hiện tại khác với tab đã đọc trước đó
    if (readingEnabled && lastSpokenTab !== title) {
      Speech.stop();
      speak(`Bạn đã chuyển hướng tới ${title}`, {
        rate: parseFloat(speechRate),
      });
      console.log(speechRate);
      setLastSpokenTab(title);
    }
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#547792",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 24,
          height: 70,
          position: "absolute",
          overflow: "visible",
        } as ViewStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Trang chủ" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Trang chủ"),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Tìm kiếm" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Trang tìm kiếm"),
        }}
      />

      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favorite",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Yêu thích" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Trang yêu thích"),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.setting} title="Cài đặt" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Trang cài đặt"),
        }}
      />
    </Tabs>
  );
}
