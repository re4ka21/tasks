import React, {useContext, useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import {LanguageContext} from '../context/LanguageContext';

const TaskInputForm = ({
  newTask,
  setNewTask,
  addTask,
  isVisible,
  setIsVisible,
}) => {
  const {language} = useContext(LanguageContext);
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const translations = {
    en: {
      enterTask: 'Enter a new task',
      selectTheme: 'Select Theme',
      addTask: 'Add Task',
      themes: ['🖥️ Freelance', '💰 Finance', '💞 Wedding', '🛒 Shopping List'],
    },
    uk: {
      enterTask: 'Введіть нове завдання',
      selectTheme: 'Виберіть тему',
      addTask: 'Додати завдання',
      themes: ['🖥️ Фріланс', '💰 Фінанси', "💞 Сім'я", '🛒 Список покупок'],
    },
    fr: {
      enterTask: 'Entrez une nouvelle tâche',
      selectTheme: 'Choisissez un thème',
      addTask: 'Ajouter une tâche',
      themes: [
        '🖥️ Freelance',
        '💰 Finances',
        '💞 Mariage',
        '🛒 Liste de courses',
      ],
    },
  };

  const handleThemeSelect = theme => {
    setSelectedTheme(theme);
    setIsDropdownVisible(false);
  };

  const handleAddTask = () => {
    if (newTask && selectedTheme) {
      addTask({theme: selectedTheme});
      setNewTask('');
      setSelectedTheme('');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="fade"
      onRequestClose={() => setIsVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder={translations[language].enterTask}
            placeholderTextColor="gray"
            value={newTask}
            onChangeText={setNewTask}
          />

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
            <Text style={styles.dropdownText}>
              {selectedTheme || translations[language].selectTheme}
            </Text>
          </TouchableOpacity>

          {isDropdownVisible && (
            <View style={styles.dropdownMenu}>
              {translations[language].themes.map((theme, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.dropdownItem}
                  onPress={() => handleThemeSelect(theme)}>
                  <Text style={styles.dropdownItemText}>{theme}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleAddTask}>
            <Text style={styles.confirmButtonText}>
              {translations[language].addTask}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#444',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#555',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  dropdown: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  dropdownText: {
    color: 'white',
    fontSize: 16,
  },
  dropdownMenu: {
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  dropdownItemText: {
    color: 'white',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#6e018a',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: '100%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskInputForm;
