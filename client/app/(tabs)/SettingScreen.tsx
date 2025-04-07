"use client";

import { useState, useEffect } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Speech from "expo-speech";
import { useTailwind } from "tailwind-rn";

export default function Setting() {
  const tw = useTailwind();
  const [settings, setSettings] = useState({
    autoReadEnabled: true,
    highContrastMode: false,
    largeTextEnabled: false,
    speechRate: 0.9,
    voiceType: "default",
    notificationsEnabled: true,
    downloadOnWifiOnly: true,
  });

  // Sử dụng Speech trực tiếp thay vì custom hook
  //   const speak = Speech.speak;
  //   const stop = Speech.stop;

  //   useEffect(() => {
  //     loadSettings();

  //     // Thông báo màn hình cài đặt cho hỗ trợ truy cập
  //     speak("Settings screen. Customize your reading experience.");

  //     return () => {
  //       stop();
  //     };
  //   }, []);

  //   const loadSettings = async () => {
  //     try {
  //       const savedSettings = await AsyncStorage.getItem("userSettings");
  //       if (savedSettings) {
  //         setSettings(JSON.parse(savedSettings));
  //       }
  //     } catch (error) {
  //       console.error("Error loading settings:", error);
  //     }
  //   };

  //   const saveSettings = async (newSettings) => {
  //     try {
  //       await AsyncStorage.setItem("userSettings", JSON.stringify(newSettings));
  //     } catch (error) {
  //       console.error("Error saving settings:", error);
  //     }
  //   };

  //   const updateSetting = (key, value) => {
  //     const newSettings = { ...settings, [key]: value };
  //     setSettings(newSettings);
  //     saveSettings(newSettings);

  //     // Thông báo thay đổi cài đặt cho hỗ trợ truy cập
  //     speak(`${key} ${value ? "enabled" : "disabled"}`);
  //   };

  //   const handleSpeechRateChange = (increase) => {
  //     let newRate = settings.speechRate;
  //     if (increase && newRate < 2.0) {
  //       newRate += 0.1;
  //     } else if (!increase && newRate > 0.5) {
  //       newRate -= 0.1;
  //     }

  //     newRate = Math.round(newRate * 10) / 10; // Làm tròn đến 1 chữ số thập phân

  //     const newSettings = { ...settings, speechRate: newRate };
  //     setSettings(newSettings);
  //     saveSettings(newSettings);

  //     // Thông báo thay đổi tốc độ nói cho hỗ trợ truy cập
  //     speak(`Speech rate set to ${newRate}`);
  //   };

  //   const handleVoiceAssistance = () => {
  //     speak(
  //       "Settings screen. Here you can customize your reading experience. Adjust text size, contrast, speech rate, and notification preferences."
  //     );
  //   };

  //   const handleResetSettings = () => {
  //     Alert.alert(
  //       "Reset Settings",
  //       "Are you sure you want to reset all settings to default?",
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Reset",
  //           onPress: () => {
  //             const defaultSettings = {
  //               autoReadEnabled: true,
  //               highContrastMode: false,
  //               largeTextEnabled: false,
  //               speechRate: 0.9,
  //               voiceType: "default",
  //               notificationsEnabled: true,
  //               downloadOnWifiOnly: true,
  //             };
  //             setSettings(defaultSettings);
  //             saveSettings(defaultSettings);
  //             speak("Settings have been reset to default");
  //           },
  //         },
  //       ]
  //     );
  //   };

  //   const testVoice = () => {
  //     Speech.speak(
  //       "This is a test of the text-to-speech feature. You can adjust the speech rate in settings.",
  //       {
  //         rate: settings.speechRate,
  //         pitch: 1.0,
  //       }
  //     );
  //   };

  return (
    <SafeAreaView style={tw("flex-1 bg-gray-100")}>
      <View
        style={tw("flex-row justify-between items-center px-4 py-3 bg-sky-700")}
      >
        <Text style={tw("text-2xl font-bold text-white")}>Settings</Text>
        <TouchableOpacity
          //   onPress={handleVoiceAssistance}
          accessibilityLabel="Voice assistance"
          accessibilityHint="Activates voice guidance for navigation"
        >
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={tw("flex-1 px-4 py-6")}>
        <View style={tw("bg-white rounded-lg overflow-hidden mb-6")}>
          <Text style={tw("px-4 py-2 bg-gray-200 font-bold")}>
            Reading Preferences
          </Text>

          <View
            style={tw(
              "px-4 py-3 flex-row justify-between items-center border-b border-gray-100"
            )}
          >
            <View>
              <Text style={tw("font-medium text-gray-800")}>
                Auto-Read Content
              </Text>
              <Text style={tw("text-sm text-gray-500")}>
                Automatically read content when opened
              </Text>
            </View>
            <Switch
              value={settings.autoReadEnabled}
              //   onValueChange={(value) => updateSetting("autoReadEnabled", value)}
              trackColor={{ false: "#767577", true: "#0284c7" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Auto-read content"
              accessibilityHint="Toggle automatic reading of content when opened"
            />
          </View>

          <View
            style={tw(
              "px-4 py-3 flex-row justify-between items-center border-b border-gray-100"
            )}
          >
            <View>
              <Text style={tw("font-medium text-gray-800")}>
                High Contrast Mode
              </Text>
              <Text style={tw("text-sm text-gray-500")}>
                Increase contrast for better visibility
              </Text>
            </View>
            <Switch
              value={settings.highContrastMode}
              //   onValueChange={(value) => updateSetting("highContrastMode", value)}
              trackColor={{ false: "#767577", true: "#0284c7" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="High contrast mode"
              accessibilityHint="Toggle high contrast mode for better visibility"
            />
          </View>

          <View style={tw("px-4 py-3 flex-row justify-between items-center")}>
            <View>
              <Text style={tw("font-medium text-gray-800")}>Large Text</Text>
              <Text style={tw("text-sm text-gray-500")}>
                Increase text size for easier reading
              </Text>
            </View>
            <Switch
              value={settings.largeTextEnabled}
              //   onValueChange={(value) => updateSetting("largeTextEnabled", value)}
              trackColor={{ false: "#767577", true: "#0284c7" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Large text"
              accessibilityHint="Toggle large text for easier reading"
            />
          </View>
        </View>

        <View style={tw("bg-white rounded-lg overflow-hidden mb-6")}>
          <Text style={tw("px-4 py-2 bg-gray-200 font-bold")}>
            Voice Settings
          </Text>

          <View style={tw("px-4 py-3 border-b border-gray-100")}>
            <View style={tw("flex-row justify-between items-center mb-2")}>
              <Text style={tw("font-medium text-gray-800")}>Speech Rate</Text>
              <Text style={tw("text-sm text-gray-500")}>
                {settings.speechRate.toFixed(1)}x
              </Text>
            </View>
            <View style={tw("flex-row justify-between items-center")}>
              <TouchableOpacity
                // onPress={() => handleSpeechRateChange(false)}
                style={tw("bg-gray-200 rounded-full p-2")}
                accessibilityLabel="Decrease speech rate"
                accessibilityHint="Make speech slower"
              >
                <Feather name="minus" size={20} color="black" />
              </TouchableOpacity>

              <View style={tw("flex-1 h-2 mx-4 bg-gray-200 rounded-full")}>
                <View
                  style={[
                    tw("h-2 bg-sky-600 rounded-full"),
                    { width: `${((settings.speechRate - 0.5) / 1.5) * 100}%` },
                  ]}
                />
              </View>

              <TouchableOpacity
                // onPress={() => handleSpeechRateChange(true)}
                style={tw("bg-gray-200 rounded-full p-2")}
                accessibilityLabel="Increase speech rate"
                accessibilityHint="Make speech faster"
              >
                <Feather name="plus" size={20} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            // onPress={testVoice}
            style={tw("px-4 py-3 flex-row items-center")}
            accessibilityLabel="Test voice"
            accessibilityHint="Play a sample of the text-to-speech voice"
          >
            <Feather name="play" size={20} color="#0284c7" style={tw("mr-2")} />
            <Text style={tw("text-sky-600 font-medium")}>Test Voice</Text>
          </TouchableOpacity>
        </View>

        <View style={tw("bg-white rounded-lg overflow-hidden mb-6")}>
          <Text style={tw("px-4 py-2 bg-gray-200 font-bold")}>
            App Preferences
          </Text>

          <View
            style={tw(
              "px-4 py-3 flex-row justify-between items-center border-b border-gray-100"
            )}
          >
            <View>
              <Text style={tw("font-medium text-gray-800")}>Notifications</Text>
              <Text style={tw("text-sm text-gray-500")}>
                Receive updates about new content
              </Text>
            </View>
            <Switch
              value={settings.notificationsEnabled}
              //   onValueChange={(value) => updateSetting("notificationsEnabled", value)}
              trackColor={{ false: "#767577", true: "#0284c7" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Notifications"
              accessibilityHint="Toggle notifications for new content"
            />
          </View>

          <View style={tw("px-4 py-3 flex-row justify-between items-center")}>
            <View>
              <Text style={tw("font-medium text-gray-800")}>
                Download on Wi-Fi Only
              </Text>
              <Text style={tw("text-sm text-gray-500")}>Save mobile data</Text>
            </View>
            <Switch
              value={settings.downloadOnWifiOnly}
              //   onValueChange={(value) => updateSetting("downloadOnWifiOnly", value)}
              trackColor={{ false: "#767577", true: "#0284c7" }}
              thumbColor="#f4f3f4"
              ios_backgroundColor="#3e3e3e"
              accessibilityLabel="Download on Wi-Fi only"
              accessibilityHint="Toggle downloading content only when connected to Wi-Fi"
            />
          </View>
        </View>

        <TouchableOpacity
          //   onPress={handleResetSettings}
          style={tw("bg-red-500 rounded-lg py-3 mb-8")}
          accessibilityLabel="Reset all settings"
          accessibilityHint="Reset all settings to their default values"
        >
          <Text style={tw("text-white font-bold text-center")}>
            Reset All Settings
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
