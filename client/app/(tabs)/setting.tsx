"use client";

import { useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Nav } from "@expo/html-elements";
import Navbar from "../components/navbar";

export default function Setting() {
  const [settings, setSettings] = useState({
    autoReadEnabled: true,
    highContrastMode: false,
    largeTextEnabled: false,
    speechRate: 0.9,
    voiceType: "default",
    notificationsEnabled: true,
    downloadOnWifiOnly: true,
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Navbar />

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-white rounded-lg overflow-hidden mb-6">
          <Text className="px-4 py-2 bg-gray-200 font-bold">
            Reading Preferences
          </Text>

          <View className="px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
            <View>
              <Text className="font-medium text-gray-800">
                Auto-Read Content
              </Text>
              <Text className="text-sm text-gray-500">
                Automatically read content when opened
              </Text>
            </View>
            <Switch
              value={settings.autoReadEnabled}
              trackColor={{ false: "#767577", true: "#D6BCFA" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Auto-read content"
              accessibilityHint="Toggle automatic reading of content when opened"
            />
          </View>

          <View className="px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
            <View>
              <Text className="font-medium text-gray-800">
                High Contrast Mode
              </Text>
              <Text className="text-sm text-gray-500">
                Increase contrast for better visibility
              </Text>
            </View>
            <Switch
              value={settings.highContrastMode}
              trackColor={{ false: "#767577", true: "#D6BCFA" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="High contrast mode"
              accessibilityHint="Toggle high contrast mode for better visibility"
            />
          </View>

          <View className="px-4 py-3 flex-row justify-between items-center">
            <View>
              <Text className="font-medium text-gray-800">Large Text</Text>
              <Text className="text-sm text-gray-500">
                Increase text size for easier reading
              </Text>
            </View>
            <Switch
              value={settings.largeTextEnabled}
              trackColor={{ false: "#767577", true: "#D6BCFA" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Large text"
              accessibilityHint="Toggle large text for easier reading"
            />
          </View>
        </View>

        <View className="bg-white rounded-lg overflow-hidden mb-6">
          <Text className="px-4 py-2 bg-gray-200 font-bold">
            Voice Settings
          </Text>

          <View className="px-4 py-3 border-b border-gray-100">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-medium text-gray-800">Speech Rate</Text>
              <Text className="text-sm text-gray-500">
                {settings.speechRate.toFixed(1)}x
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <TouchableOpacity
                className="bg-gray-200 rounded-full p-2"
                accessibilityLabel="Decrease speech rate"
                accessibilityHint="Make speech slower"
              >
                <Feather name="minus" size={20} color="black" />
              </TouchableOpacity>

              <View className="flex-1 h-2 mx-4 bg-gray-200 rounded-full">
                <View
                  style={{
                    width: `${((settings.speechRate - 0.5) / 1.5) * 100}%`,
                  }}
                  className="h-2 bg-purple-500 rounded-full"
                />
              </View>

              <TouchableOpacity
                className="bg-gray-200 rounded-full p-2"
                accessibilityLabel="Increase speech rate"
                accessibilityHint="Make speech faster"
              >
                <Feather name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className="px-4 py-3 flex-row items-center"
            accessibilityLabel="Test voice"
            accessibilityHint="Play a sample of the text-to-speech voice"
          >
            <Feather name="play" size={20} color="#D6BCFA" className="mr-2" />
            <Text className="text-sky-600 font-medium">Test Voice</Text>
          </TouchableOpacity>
        </View>

        <View className="bg-white rounded-lg overflow-hidden mb-6">
          <Text className="px-4 py-2 bg-gray-200 font-bold">
            App Preferences
          </Text>

          <View className="px-4 py-3 flex-row justify-between items-center border-b border-gray-100">
            <View>
              <Text className="font-medium text-gray-800">Notifications</Text>
              <Text className="text-sm text-gray-500">
                Receive updates about new content
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              trackColor={{ false: "#767577", true: "#D6BCFA" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Notifications"
              accessibilityHint="Toggle notifications for new content"
            />
          </View>
        </View>

        <TouchableOpacity
          className="bg-red-500 rounded-lg py-3 mb-8"
          accessibilityLabel="Reset all settings"
          accessibilityHint="Reset all settings to their default values"
        >
          <Text className="text-white font-bold text-center">
            Reset All Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
