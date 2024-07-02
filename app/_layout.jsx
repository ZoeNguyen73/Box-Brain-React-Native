import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { OpenSans_400Regular, OpenSans_600SemiBold, OpenSans_700Bold } from "@expo-google-fonts/open-sans";
import { PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from "@expo-google-fonts/playfair-display";
import { NotoSansMono_400Regular, NotoSansMono_600SemiBold, NotoSansMono_700Bold } from "@expo-google-fonts/noto-sans-mono";

import { AuthProvider } from "../context/AuthProvider";
import ThemeProvider from "../context/ThemeProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    "Open Sans" : OpenSans_400Regular,
    "Playfair Display": PlayfairDisplay_400Regular,
    "Noto Sans Mono": NotoSansMono_400Regular,
    // OpenSans_600SemiBold,
    // OpenSans_700Bold,
    
    // PlayfairDisplay_600SemiBold,
    // PlayfairDisplay_700Bold,
    
    // NotoSansMono_600SemiBold,
    // NotoSansMono_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
    
  )
};

export default RootLayout;