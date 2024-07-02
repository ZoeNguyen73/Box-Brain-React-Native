import { Stack } from "expo-router";

import { AuthProvider } from "../context/AuthProvider";
import ThemeProvider from "../context/ThemeProvider";

const RootLayout = () => {
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