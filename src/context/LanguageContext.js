import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const storedLanguage = await AsyncStorage.getItem('language');
      if (storedLanguage !== null) {
        setLanguage(storedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const selectLanguage = async newLanguage => {
    setLanguage(newLanguage);
    await AsyncStorage.setItem('language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{language, selectLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
