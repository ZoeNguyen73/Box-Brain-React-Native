import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Dimensions } from "react-native";
import { router, Redirect, Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

import { useAuthContext } from "../context/AuthProvider";
import { useThemeContext } from "../context/ThemeProvider";
import tailwindConfig from "../tailwind.config";

// components
import CustomButton from "../components/CustomButton/CustomButton";

import { illustrations } from "../constants";

const App = () => {
  const { isLoggedIn, isLoading } = useAuthContext();
  const { theme } = useThemeContext();
  const { width } = Dimensions.get("window");
  const circleDiameter = width * 0.7;

  const lightBackgroundColor = tailwindConfig.theme.extend.colors.light.background;
  const darkBackgroundColor = tailwindConfig.theme.extend.colors.dark.background;
  const darkTextColor = tailwindConfig.theme.extend.colors.dark.text;

  if (theme === null) {
    return (
      <Text>Loading...</Text>
    )
  }

  if (!isLoading && isLoggedIn) {
    return <Redirect href="/home" />
  };

  return (
    <SafeAreaView 
      className={`
        ${ theme === "dark" ? "dark" : "" }
        bg-light-mauve
        items-center h-full
      `}
    >
      
      <View className="bg-light-mauve justify-center items-center flex h-[50vh] mb-20">
        <View 
          className="bg-light-yellow rounded-full justify-center items-center"
          style={{ width: circleDiameter, height: circleDiameter }}
        >
          <Image 
            source={illustrations.openDoodlesStudying}
            style={{ position: "absolute", height: circleDiameter * 1.2, maxWidth: "150%", top: circleDiameter * 0.2 }}
            resizeMode="contain"
          />
        </View>
        
      </View>
      
      <View className="flex-column justify-center items-center">
        <Text className="text-dark-text font-sans text-xl">
          Welcome to
        </Text>
        <Text 
          className="text-light-off-white font-serif-bold text-5xl tracking-wider"
        >
          Box Brain
        </Text>
        
      </View>
      
      <View className="flex-row gap-2 mt-5">
        <Text className="font-sans-semibold text-dark-text tracking-wide">
          Learn smarter - the big
        </Text>
        <FontAwesome5
          name="brain" size={16} 
          color={darkTextColor}
        />
        <Text className="font-sans-semibold text-dark-text tracking-wide">
          way!
        </Text>
      </View> 
      
      <CustomButton 
        title="Get Started"
        handlePress={() => router.push("/register")}
        containerStyles="w-fit px-6 py-4 mt-7 mb-7 w-[80%]"
        icon
      />

      <StatusBar 
        backgroundColor={`${ theme === "dark" ? darkBackgroundColor : lightBackgroundColor }`} 
        style={`${ theme === "dark" ? "light" : "dark"}`}
      />
    </SafeAreaView>
  );
}

export default App;