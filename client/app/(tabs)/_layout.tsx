import { Tabs } from "expo-router";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Platform,
  ViewStyle,
} from "react-native";
import * as Speech from "expo-speech";
import { useState } from "react";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";

// Fallback for TTS on web
const speak = (text: string): void => {
  if (Platform.OS !== "web") {
    Speech.speak(text, { language: "en" }); // Đọc bằng tiếng Anh
  } else {
    console.log(`TTS on web: ${text}`);
  }
};

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight as any}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
        accessible
        accessibilityLabel={title}
        accessibilityRole="button"
      >
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </ImageBackground>
    );
  }

  return (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#A8B5DB" className="size-5" />
    </View>
  );
}

export default function TabsLayout() {
  const [lastSpokenTab, setLastSpokenTab] = useState<string | null>(null); // Theo dõi tab đã được đọc TTS

  const handleTabPress = (title: string) => {
    // Chỉ đọc TTS nếu tab hiện tại khác với tab đã đọc trước đó
    if (lastSpokenTab !== title) {
      speak(`You have navigated to the ${title} page`);
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
          backgroundColor: "#0F0D23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 24,
          height: 55,
          position: "absolute",
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#0F0D23",
        } as ViewStyle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Home"),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Search"),
        }}
      />

      <Tabs.Screen
        name="favourite"
        options={{
          title: "Favorite",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Favourite" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Favourite"),
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.setting} title="Setting" />
          ),
        }}
        listeners={{
          tabPress: () => handleTabPress("Setting"),
        }}
      />
    </Tabs>
  );
}
