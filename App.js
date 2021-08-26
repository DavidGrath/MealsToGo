import React, { useEffect, useState } from "react";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
import { ThemeProvider } from "styled-components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as firebase from "firebase";

import { API_CONFIGS, STORAGE_KEYS } from "./src/util/constants";
import { theme } from "./src/theme";
import { AuthenticationContextProvider } from "./src/api/authentication/AuthenticationContext";
import MainNavigation from "./src/navigation";

if (!firebase.apps.length) {
  firebase.initializeApp(API_CONFIGS.FIREBASE_CONFIG);
}

function App() {
  const [usedSplashBefore, setUsedSplashBefore] = useState(false);

  useEffect(() => {
    loadUsedSplashBefore();
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });
  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
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
      <AuthenticationContextProvider>
        <MainNavigation usedSplashBefore={usedSplashBefore} />
      </AuthenticationContextProvider>
    </ThemeProvider>
  );
}

export default App;
