import { Tabs } from "expo-router";
import React from "react";
import { View, Platform, useWindowDimensions, ViewStyle } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Feather } from "@expo/vector-icons";
import { House } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import * as Speech from "expo-speech";

// Define types for Feather icons
type FeatherIconName = "coffee" | "star" | "bell";

// Define tab configuration type
interface TabConfig {
  name: string;
  label: string;
  icon: React.ComponentType<any>;
  iconName: FeatherIconName | null;
}

// Constants for tab configuration
const TABS: TabConfig[] = [
  { name: "index", label: "Explore", icon: House, iconName: null },
  { name: "NewsScreen", label: "News", icon: Feather, iconName: "coffee" },
  {
    name: "FavouriteScreen",
    label: "Favourite",
    icon: Feather,
    iconName: "star",
  },
  { name: "SettingScreen", label: "Settings", icon: Feather, iconName: "bell" },
];

// TTS function
const speak = (text: string): void => {
  Speech.speak(text, { language: "en" });
};

// Props type for TabIcon component
interface TabIconProps {
  focused: boolean;
  label: string;
  IconComponent: React.ComponentType<any>;
  iconName: FeatherIconName | null;
  tabBarHeight: number;
  tabBarFixedWidth: number;
  width: number;
}

// Reusable Tab Icon Component
const TabIcon: React.FC<TabIconProps> = ({
  focused,
  label,
  IconComponent,
  iconName,
  tabBarHeight,
  tabBarFixedWidth,
  width,
}) => (
  <View
    className={`flex-row items-center justify-center px-4 rounded-full ${
      focused ? "bg-gradient-to-r from-green-600 to-green-400" : ""
    }`}
    style={{
      width: focused ? tabBarFixedWidth : "auto",
      minWidth: focused ? tabBarFixedWidth : width > 768 ? 60 : 50,
      height: focused ? tabBarHeight : "auto",
    }}
    accessible
    accessibilityLabel={label}
    accessibilityRole="button"
  >
    {iconName ? (
      <IconComponent
        size={width > 768 ? 24 : 20}
        name={iconName}
        color="white"
      />
    ) : (
      <IconComponent className="size-5 text-white" />
    )}
    {focused && (
      <Text className="text-white text-base font-semibold ml-2">{label}</Text>
    )}
  </View>
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  // Dynamic sizes for responsiveness
  const tabBarHeight: number = width > 768 ? 60 : 52;
  const tabBarMarginHorizontal: number = width > 768 ? 40 : 20;
  const tabBarFixedWidth: number = width > 768 ? 140 : 120;

  // Tab bar style configuration
  const tabBarStyle: ViewStyle = {
    position: "absolute",
    backgroundColor: "rgba(31, 41, 55, 0.8)", // Semi-transparent version of #1F2937 to simulate blur
    borderRadius: 50,
    marginHorizontal: tabBarMarginHorizontal,
    marginBottom: width > 768 ? 48 : 36,
    height: tabBarHeight,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0f0d23",
    paddingHorizontal: width > 768 ? 16 : 8,
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarBackground: TabBarBackground,
        tabBarStyle,
      }}
    >
      {TABS.map(({ name, label, icon: IconComponent, iconName }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            tabBarIcon: ({ focused }: { focused: boolean }) => (
              <TabIcon
                focused={focused}
                label={label}
                IconComponent={IconComponent}
                iconName={iconName}
                tabBarHeight={tabBarHeight}
                tabBarFixedWidth={tabBarFixedWidth}
                width={width}
              />
            ),
            tabBarLabel: () => null,
          }}
          listeners={{
            tabPress: () =>
              speak(`You have been redirected to the ${label} page.`),
          }}
        />
      ))}
    </Tabs>
  );
}
