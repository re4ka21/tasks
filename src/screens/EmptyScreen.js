import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';
import {LanguageContext} from '../context/LanguageContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ToggleSwitch from 'toggle-switch-react-native';

const EmptyScreen = () => {
  const {isDarkTheme, toggleTheme} = useContext(ThemeContext);
  const {language, selectLanguage} = useContext(LanguageContext);
  const [isModalVisible, setModalVisible] = useState(false);

  const themeStyles = {
    light: {
      backgroundColor: '#FFFFFF', // Світлий фон
      textColor: '#000000', // Темний текст
      buttonColor: '#007BFF', // Колір кнопок
      borderBottomColor:  '#575767' , // Колір розділової лінії
    },
    dark: {
      backgroundColor: '#141419', // Темний фон
      textColor: '#FFFFFF', // Світлий текст
      buttonColor: '#FF9D26', // Колір кнопок
      borderBottomColor: '#D0D0D0', // Колір розділової лінії
    },
  };
  const translations = {
    en: {
      theme: 'Theme',
      changeLang: 'Language',
      settings: 'Settings',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: 'Dark',
      light: 'Light',
      language: 'English',
      lan: '🇺🇲 English',
      all: 'All languages',
      now: 'Current language', // Пункт "now" для англійської мови
    },
    uk: {
      theme: 'Тема',
      changeLang: 'Мова',
      settings: 'Налаштування',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: 'Темна',
      light: 'Світла',
      language: 'Українська',
      lan: '🇺🇦 Українська',
      all: 'Всі мови',
      now: 'Поточна мова', // Пункт "now" для української мови
    },
    fr: {
      theme: 'Thème',
      changeLang: 'Langue',
      settings: 'Paramètres',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: 'Sombre',
      light: 'Clair',
      language: 'Français',
      lan: '🇲🇫 Français',
      all: 'Toutes les langues',
      now: 'Langue actuelle', // Пункт "now" для французької мови
    },
    ru: {
      theme: 'Тема',
      changeLang: 'Язык',
      settings: 'Настройки',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: 'Тёмная',
      light: 'Светлая',
      language: 'Русский',
      lan: '🇷🇺 Русский',
      all: 'Все языки',
      now: 'Текущий язык', // Пункт "now" для російської мови
    },
    zh: {
      theme: '主题',
      changeLang: '语言',
      settings: '设置',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: '黑暗',
      light: '光明',
      language: '中文',
      lan: '🇨🇳 中文',
      all: '所有语言',
      now: '当前语言', // Пункт "now" для китайської мови
    },
    pl: {
      theme: 'Temat',
      changeLang: 'Język',
      settings: 'Ustawienia',
      english: '🇺🇲 English',
      ukrainian: '🇺🇦 Українська',
      french: '🇲🇫 Français',
      russian: '🇷🇺 Русский',
      chinese: '🇨🇳 中文',
      polish: '🇵🇱 Polski',
      dark: 'Ciemny',
      light: 'Jasny',
      language: 'Polski',
      lan: '🇵🇱 Polski',
      all: 'Wszystkie języki',
      now: 'Bieżący język', // Пункт "now" для польської мови
    },
  };

  const t = translations[language];
  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  const languages = [
    {key: 'en', label: t.english},
    {key: 'uk', label: t.ukrainian},
    {key: 'fr', label: t.french},
    {key: 'ru', label: t.russian},
    {key: 'zh', label: t.chinese},
    {key: 'pl', label: t.polish},
  ];

  const moon = (
      <Icon name="moon" size={30} color={currentTheme.textColor} />
  );
  const globe = (
      <Icon name="globe" size={30} color={currentTheme.textColor} />
  );
  const gal = <Icon name="check" size={20} color="green" />;
  const modalContentBackgroundColor = isDarkTheme ? '#2C2C2C' : '#FFFFFF'; // Фон для вмісту модалки
  return (
      <View
          style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
        <Text style={[styles.set, { color: currentTheme.textColor }]}>
          {t.settings}
        </Text>
        <View
            style={[styles.line, { borderBottomColor: currentTheme.borderBottomColor }]}
        />
        <View style={styles.row}>
          <View style={styles.rowContent}>
            {moon}
            <Text style={[styles.text, { color: currentTheme.textColor }]}>
              {isDarkTheme ? t.dark : t.light}
            </Text>
          </View>
          <ToggleSwitch
              isOn={isDarkTheme}
              onColor={currentTheme.buttonColor}
              offColor="#ccc"
              onToggle={toggleTheme}
              style={[styles.toggleSwitch, { transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }]}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowContent}>
            {globe}
            <Text style={[styles.text, { color: currentTheme.textColor }]}>
              {t.changeLang}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.lann}>
              <Text
                  style={[styles.changeLang, { color: currentTheme.buttonColor }]}>
                {t.language}
              </Text>
              <Text style={styles.icom}>
                <Icon name="chevron-right" size={17} color="gray" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
            transparent={true}
            visible={isModalVisible}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}>
          <TouchableOpacity
              style={styles.modalContainer}
              activeOpacity={1}
              onPress={() => setModalVisible(false)}>
            <View
                style={[styles.modalContent, { backgroundColor: modalContentBackgroundColor }]}>
              <Text style={[styles.now, { color: currentTheme.textColor }]}>
                {t.now}
              </Text>

              <View style={styles.cur}>
                <Text
                    style={[styles.currentLanguage, { color: currentTheme.buttonColor }]}>
                  {`${t.lan}`}
                </Text>
                <Text>{gal}</Text>
              </View>

              <Text style={[styles.all, { color: currentTheme.textColor }]}>
                {t.all}
              </Text>

              <FlatList
                  data={languages.filter(item => item.key !== language)}
                  renderItem={({ item }) => (
                      <TouchableOpacity
                          onPress={() => {
                            selectLanguage(item.key);
                            setModalVisible(false);
                          }}>
                        <Text
                            style={[styles.languageOption, { color: currentTheme.textColor }]}>
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                  )}
                  keyExtractor={item => item.key}
              />
            </View>
          </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  cur: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
  },
  lann: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  all: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 4,
    fontSize: 18,
    fontWeight: '700',
  },
  now: {
    marginBottom: 13,
    marginTop: 10,
    marginLeft: 4,
    fontSize: 18,
    fontWeight: '700',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
  icom: {
    marginLeft: 17,
  },
  currentLanguage: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  set: {
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
  },
  toggleSwitch: {
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  lines: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
  },
  changeLang: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
  },
  languageOption: {
    fontSize: 18,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default EmptyScreen;