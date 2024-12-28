import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {LanguageContext} from '../context/LanguageContext';

const EmptyScreen = () => {
  const {isDarkTheme, toggleTheme} = useContext(ThemeContext);
  const {language, selectLanguage} = useContext(LanguageContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const translations = {
    en: {
      theme: 'Theme',
      changeTheme: 'Change theme to',
      currentLang: 'Language',
      changeLang: 'Change language',
      settings: 'Settings',
      english: '🇺🇲 EN',
      ukrainian: '🇺🇦 UA',
      french: '🇲🇫 FR',
      dark: 'Dark',
      light: 'Light',
    },
    uk: {
      theme: 'Тема',
      changeTheme: 'Змінити тему на',
      currentLang: 'Мова',
      changeLang: 'Змінити мову',
      settings: 'Налаштування',
      english: '🇺🇲 EN',
      ukrainian: '🇺🇦 UA',
      french: '🇲🇫 FR',
      dark: 'Темна',
      light: 'Світла',
    },
    fr: {
      theme: 'Thème',
      changeTheme: 'Changer le thème en',
      currentLang: 'Langue',
      changeLang: 'Changer la langue',
      settings: 'Paramètres',
      english: '🇺🇲 EN',
      ukrainian: '🇺🇦 UA',
      french: '🇲🇫 FR',
      dark: 'Sombre',
      light: 'Clair',
    },
  };

  const t = translations[language];

  const languages = [
    {key: 'en', label: t.english},
    {key: 'uk', label: t.ukrainian},
    {key: 'fr', label: t.french},
  ];

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkTheme ? '#141419' : '#F8F8F8'},
      ]}>
      <Text style={[styles.set, {color: isDarkTheme ? 'white' : 'black'}]}>
        {t.settings}
      </Text>
      <View style={styles.row}>
        <Text style={[styles.text, {color: isDarkTheme ? 'white' : 'black'}]}>
          {t.theme}: {isDarkTheme ? t.dark : t.light}
        </Text>
        <TouchableOpacity style={styles.button} onPress={toggleTheme}>
          <Text style={styles.buttonText}>
            {t.changeTheme} {isDarkTheme ? t.light : t.dark}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.row, {marginTop: 20}]}>
        <Text style={[styles.text, {color: isDarkTheme ? 'white' : 'black'}]}>
          {t.currentLang}: {t[language]}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{t.changeLang}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={languages}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.languageOption}
                  onPress={() => {
                    selectLanguage(item.key);
                    setModalVisible(false);
                  }}>
                  <Text style={styles.languageText}>{item.label}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.key}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginRight: 10,
    marginLeft: 10,
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#b400c4',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
  set: {
    marginBottom: 30,
    marginTop: 37,
    marginLeft: 16,
    fontSize: 32,
    fontWeight: '700',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  languageOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageText: {
    fontSize: 18,
  },
});

export default EmptyScreen;
