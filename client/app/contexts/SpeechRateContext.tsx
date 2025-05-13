import React, { createContext, useContext, useState } from "react";

type SpeechRateContextType = {
  speechRate: string;
  setSpeechRate: (rate: string) => void;
};

const SpeechRateContext = createContext<SpeechRateContextType | undefined>(
  undefined
);

export const SpeechRateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [speechRate, setSpeechRate] = useState("1");
  return (
    <SpeechRateContext.Provider value={{ speechRate, setSpeechRate }}>
      {children}
    </SpeechRateContext.Provider>
  );
};

export const useSpeechRate = () => {
  const context = useContext(SpeechRateContext);
  if (!context)
    throw new Error("useSpeechRate must be used within SpeechRateProvider");
  return context;
};
