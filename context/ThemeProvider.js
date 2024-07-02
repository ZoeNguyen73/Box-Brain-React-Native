import { Appearance } from "react-native";
import React, { createContext, useState, useContext, useEffect } from "react";
import { useColorScheme } from "nativewind";

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  // const systemColorScheme = useColorScheme();
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [ theme, setTheme ] = useState("light");

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === "light" ? "dark" : "light");
    toggleColorScheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider;