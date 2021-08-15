import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, StatusBar } from "react-native";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { ThemeProvider } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import { STORAGE_KEYS } from "./src/util/constants";
import { theme } from "./src/theme";
import { appStack } from "./src/modules/navigation";

function App() {
  const [usedSplashBefore, setUsedSplashBefore] = useState(false);

  useEffect(() => {
    loadUsedSplashBefore();
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  if (!oswaldLoaded) {
    return null;
  }

  async function loadUsedSplashBefore() {
    try {
      const splashBefore =
        (await AsyncStorage.getItem(STORAGE_KEYS.ONBOARDED_BEFORE)) === "true";
      setUsedSplashBefore(splashBefore);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>{appStack(usedSplashBefore)}</NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
