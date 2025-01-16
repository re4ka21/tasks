import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('isDarkTheme');
      if (storedTheme !== null) {
        setIsDarkTheme(JSON.parse(storedTheme));
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    await AsyncStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
  };

  return (
    <ThemeContext.Provider value={{isDarkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
