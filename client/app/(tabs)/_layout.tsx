import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTailwind } from "tailwind-rn";
import { Feather } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tw = useTailwind();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            <View style={{ alignItems: "center" }}>
              <Feather size={20} name="external-link" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="NewsScreen"
        options={{
          title: "News",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="coffee" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="LibraryScreen"
        options={{
          title: "Favourite",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="star" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingScreen"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <Feather size={20} name="bell" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
