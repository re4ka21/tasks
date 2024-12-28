import React, {createContext, useState} from 'react';

export const LanguageContext = createContext();

export const LanguageProvider = ({children}) => {
  const [language, setLanguage] = useState('en');

  const selectLanguage = lang => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{language, selectLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};
