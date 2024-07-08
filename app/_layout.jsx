import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { 
  OpenSans_300Light,
  OpenSans_400Regular, 
  OpenSans_600SemiBold, 
  OpenSans_700Bold,
  OpenSans_300Light_Italic,
  OpenSans_400Regular_Italic,
  OpenSans_600SemiBold_Italic,
  OpenSans_700Bold_Italic
} from "@expo-google-fonts/open-sans";
import { 
  Poppins_300Light,
  Poppins_400Regular, 
  Poppins_600SemiBold, 
  Poppins_700Bold,
  Poppins_300Light_Italic,
  Poppins_400Regular_Italic,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold_Italic
} from "@expo-google-fonts/poppins";
import { 
  PlayfairDisplay_400Regular, 
  PlayfairDisplay_600SemiBold, 
  PlayfairDisplay_700Bold,
  PlayfairDisplay_900Black 
} from "@expo-google-fonts/playfair-display";
import { 
  Fraunces_400Regular, 
  Fraunces_600SemiBold, 
  Fraunces_700Bold,
  Fraunces_900Black 
} from "@expo-google-fonts/fraunces";
import { 
  NotoSansMono_300Light,
  NotoSansMono_400Regular, 
  NotoSansMono_600SemiBold, 
  NotoSansMono_700Bold,
  NotoSansMono_900Black 
} from "@expo-google-fonts/noto-sans-mono";

import { AuthProvider } from "../context/AuthProvider";
import ThemeProvider from "../context/ThemeProvider";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    OpenSans_300Light,
    OpenSans_400Regular, 
    OpenSans_600SemiBold, 
    OpenSans_700Bold,
    OpenSans_300Light_Italic,
    OpenSans_400Regular_Italic,
    OpenSans_600SemiBold_Italic,
    OpenSans_700Bold_Italic,
    PlayfairDisplay_400Regular, 
    PlayfairDisplay_600SemiBold, 
    PlayfairDisplay_700Bold,
    PlayfairDisplay_900Black,
    NotoSansMono_300Light,
    NotoSansMono_400Regular, 
    NotoSansMono_600SemiBold, 
    NotoSansMono_700Bold,
    NotoSansMono_900Black,
    Poppins_300Light,
    Poppins_400Regular, 
    Poppins_600SemiBold, 
    Poppins_700Bold,
    Poppins_300Light_Italic,
    Poppins_400Regular_Italic,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold_Italic,
    Fraunces_400Regular, 
    Fraunces_600SemiBold, 
    Fraunces_700Bold,
    Fraunces_900Black  
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