import React, {useState, useEffect, useContext} from 'react';
import {
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../context/ThemeContext';
import {LanguageContext} from '../context/LanguageContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ThemedBlock from '../components/Block';
const translations = {
  en: {
    notes: 'Notes',
    enterTitle: 'Enter title',
    writeYourNote: 'Write your note here...',
    addNote: 'Add Note',
    createdAt: 'Created:',
    delete: 'Delete',
    untitled: 'Untitled',
    save: 'Save',
  },
  uk: {
    notes: 'Нотатки',
    enterTitle: 'Введіть заголовок',
    writeYourNote: 'Напишіть вашу нотатку тут...',
    addNote: 'Додати нотатку',
    createdAt: 'Створено:',
    delete: 'Видалити',
    untitled: 'Без заголовка',
    save: 'Зберегти',
  },
  fr: {
    notes: 'Notes',
    enterTitle: 'Entrez un titre',
    writeYourNote: 'Écrivez votre note ici...',
    addNote: 'Ajouter une note',
    createdAt: 'Créé:',
    delete: 'Supprimer',
    untitled: 'Sans titre',
    save: 'Enregistrer',
  },
  ru: {
    notes: 'Заметки',
    enterTitle: 'Введите заголовок',
    writeYourNote: 'Напишите свою заметку здесь...',
    addNote: 'Добавить заметку',
    createdAt: 'Создано:',
    delete: 'Удалить',
    untitled: 'Без заголовка',
    save: 'Сохранить',
  },
  zh: {
    notes: '笔记',
    enterTitle: '输入标题',
    writeYourNote: '在这里写下您的笔记...',
    addNote: '添加笔记',
    createdAt: '创建于：',
    delete: '删除',
    untitled: '无标题',
    save: '保存',
  },
  pl: {
    notes: 'Notatki',
    enterTitle: 'Wprowadź tytuł',
    writeYourNote: 'Napisz swoją notatkę tutaj...',
    addNote: 'Dodaj notatkę',
    createdAt: 'Utworzono:',
    delete: 'Usuń',
    untitled: 'Bez tytułu',
    save: 'Zapisz',
  },
};

const NotebookScreen = () => {
  const {language} = useContext(LanguageContext);
  const {isDarkTheme} = useContext(ThemeContext);
  const [notes, setNotes] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const NOTES_STORAGE_KEY = 'notes';

  // Завантаження записок при завантаженні компонента
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
        if (storedNotes) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (error) {
        console.error('Failed to load notes', error);
      }
    };

    loadNotes();
  }, []);

  // Збереження записок після кожної зміни
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
      } catch (error) {
        console.error('Failed to save notes', error);
      }
    };

    saveNotes();
  }, [notes]);

  const handleAddNote = () => {
    setIsCreating(true);
    setCurrentNote({id: Date.now().toString(), title: '', content: ''});
  };

  const handleSaveNote = () => {
    if (currentNote.title.trim() || currentNote.content.trim()) {
      setNotes(prevNotes =>
          prevNotes.some(note => note.id === currentNote.id)
              ? prevNotes.map(note =>
                  note.id === currentNote.id ? currentNote : note,
              )
              : [
                ...prevNotes,
                {...currentNote, createdAt: new Date().toLocaleString()},
              ],
      );
    }
    setIsCreating(false);
    setCurrentNote(null);
  };
  const handleSave = () => {
    if (currentNote.title.trim() || currentNote.content.trim()) {
      setNotes(prevNotes =>
          prevNotes.some(note => note.id === currentNote.id)
              ? prevNotes.map(note =>
                  note.id === currentNote.id ? currentNote : note,
              )
              : [
                ...prevNotes,
                {...currentNote, createdAt: new Date().toLocaleString()},
              ],
      );
    }
    Keyboard.dismiss();
  };

  const handleDeleteNote = id => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const handleEditNote = note => {
    setCurrentNote(note);
    setIsCreating(true);
  };

  const t = translations[language];
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
  const currentTheme = isDarkTheme ? themeStyles.dark : themeStyles.light;
  return (
      <KeyboardAvoidingView
          style={[styles.container, {backgroundColor: currentTheme.backgroundColor}]}
          behavior="height">
        {!isCreating && (
            <ThemedBlock
                text={t.notes}
                show={!isCreating} // Показується лише якщо isCreating === false
                textStyle={[styles.set, { color: currentTheme.textColor }]}
                lineStyle={[styles.line, { borderBottomColor: currentTheme.borderBottomColor }]}
            />
        )}

        {isCreating ? (
            <View style={styles.editor}>
              <TextInput
                  style={[
                    styles.titleInput,
                    {color: currentTheme.textColor},
                    {borderBottomColor: currentTheme.textColor}, // Use currentTheme for text and border colors
                  ]}
                  placeholder={t.enterTitle}
                  placeholderTextColor={currentTheme.textColor}
                  value={currentNote.title}
                  onChangeText={text => setCurrentNote({...currentNote, title: text})}
              />
              <TextInput
                  style={[
                    styles.contentInput,
                    {color: currentTheme.textColor},
                  ]}
                  placeholder={t.writeYourNote}
                  placeholderTextColor={currentTheme.textColor}
                  value={currentNote.content}
                  onChangeText={text =>
                      setCurrentNote({...currentNote, content: text})
                  }
                  multiline
                  scrollEnabled={true} // Дозволяє прокручувати текст
                  textAlignVertical="top"
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
                <View style={styles.back}>
                  <Text style={styles.icom}>
                    <Icon
                        name="chevron-left"
                        size={17}
                        color={currentTheme.buttonColor} // Use currentTheme for button color
                    />
                  </Text>
                  <Text
                      style={[
                        styles.saveButtonText,
                        {color: currentTheme.buttonColor}, // Use currentTheme for button text color
                      ]}
                  >
                    {t.notes}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButtontwo} onPress={handleSave}>
                <View style={styles.back}>
                  <Text
                      style={[
                        styles.saveButtonText,
                        {color: currentTheme.buttonColor}, // Use currentTheme for button text color
                      ]}
                  >
                    {t.save}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.listContainer}>
              <FlatList
                  data={notes}
                  keyExtractor={item => item.id}
                  renderItem={({item}) => (
                      <View
                          style={[
                            styles.noteItem,
                            {backgroundColor: currentTheme.backgroundColor},
                            {borderColor: currentTheme.textColor}, // Use currentTheme for background and border color
                          ]}
                      >
                        <TouchableOpacity
                            style={styles.noteContent}
                            onPress={() => handleEditNote(item)}
                        >
                          <Text
                              style={[
                                styles.noteTitle,
                                {color: currentTheme.textColor}, // Use currentTheme for text color
                              ]}
                          >
                            {item.title || t.untitled}
                          </Text>
                          <Text style={styles.noteDate}>
                            {t.createdAt} {item.createdAt}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteNote(item.id)}
                        >
                          <Text style={styles.deleteButtonText}>{t.delete}</Text>
                        </TouchableOpacity>
                      </View>
                  )}
              />
              <TouchableOpacity
                  style={[
                    styles.addButton,
                    {backgroundColor: currentTheme.buttonColor}, // Use currentTheme for button color
                  ]}
                  onPress={handleAddNote}
              >
                <Text style={styles.addButtonText}>{t.addNote}</Text>
              </TouchableOpacity>
            </View>
        )}
      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    flex: 1,
  },
  back: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 3,

    paddingBottom: 5,
    marginHorizontal: 3,
    marginBottom: 16,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  noteContent: {
    flex: 1,
  },
  set: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  noteDate: {
    fontSize: 14,
    color: '#555',
  },
  addButton: {
    marginTop: 10,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editor: {
    flex: 1,
  },
  icom: {
    marginRight: 4,
  },
  titleInput: {
    fontSize: 27,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 25,
    padding: 5,
  },
  contentInput: {
    fontSize: 16,
    padding: 10,

    height: 500, // Обмежте висоту (можете налаштувати під свої потреби)
    maxHeight: 500, // Максимальна висота
    textAlignVertical: 'top', // Текст буде вирівняний з верхньої частини

  },
  saveButton: {
    position: 'absolute',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:5,
  },
  saveButtontwo:{
    position: 'absolute',
    borderRadius: 8,
    alignItems: 'center',
    marginTop:5,
    right: 0,
    paddingRight: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default NotebookScreen;