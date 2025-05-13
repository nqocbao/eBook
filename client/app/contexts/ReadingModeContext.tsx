import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ReadingModeContextType = {
  readingEnabled: boolean;
  setReadingEnabled: (enabled: boolean) => void;
};

const ReadingModeContext = createContext<ReadingModeContextType | undefined>(
  undefined
);

export const ReadingModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [readingEnabled, setReadingEnabledState] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("readingEnabled").then((value) => {
      if (value !== null) setReadingEnabledState(value === "true");
    });
  }, []);

  const setReadingEnabled = (enabled: boolean) => {
    setReadingEnabledState(enabled);
    AsyncStorage.setItem("readingEnabled", enabled.toString());
  };

  return (
    <ReadingModeContext.Provider value={{ readingEnabled, setReadingEnabled }}>
      {children}
    </ReadingModeContext.Provider>
  );
};

export const useReadingMode = () => {
  const context = useContext(ReadingModeContext);
  if (!context)
    throw new Error("useReadingMode must be used within ReadingModeProvider");
  return context;
};
