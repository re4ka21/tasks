import React, {useContext, useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {LanguageContext} from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskList from '../components/TaskList';
import TaskInputForm from '../components/TaskInputForm';
import AddTaskButton from '../components/AddTaskButton';
import {ThemeContext} from '../context/ThemeContext';

const translations = {
  en: {
    incomplete: 'Incomplete',
    completed: 'Completed',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} Incompleted, ${completed} Complete`,
    emptyList: 'No tasks available.',
  },
  uk: {
    incomplete: 'Невиконані',
    completed: 'Виконані',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} Невиконаних, ${completed} Виконаних`,
    emptyList: 'Немає завдань.',
  },
  fr: {
    incomplete: 'Inachevées',
    completed: 'Terminées',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} Inachevées, ${completed} Terminées`,
    emptyList: 'Aucune tâche disponible.',
  },
  ru: {
    incomplete: 'Невыполненные',
    completed: 'Выполненные',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} Невыполненных, ${completed} Выполненных`,
    emptyList: 'Нет доступных задач.',
  },
  zh: {
    incomplete: '未完成',
    completed: '已完成',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} 未完成, ${completed} 已完成`,
    emptyList: '没有可用的任务。',
  },
  pl: {
    incomplete: 'Niewykonane',
    completed: 'Wykonane',
    taskSummary: (uncompleted, completed) =>
      `${uncompleted} Niewykonane, ${completed} Wykonane`,
    emptyList: 'Brak dostępnych zadań.',
  },
};

const AddTaskScreen = () => {
  const {language} = useContext(LanguageContext);
  const {isDarkTheme} = useContext(ThemeContext);
  const [currentDate, setCurrentDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);
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
  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString(language, {month: 'long'});
    const year = date.getFullYear();
    setCurrentDate(`${month} ${day}, ${year}`);
    loadTasks();
  }, [language]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) setTasks(JSON.parse(storedTasks));
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const saveTasks = async newTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const addTask = ({theme}) => {
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now().toString(),
        text: newTask,
        completed: false,
        theme,
      };
      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
      setNewTask('');
      setShowInput(false);
    }
  };

  const markTaskComplete = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? {...task, completed: !task.completed} : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const t = translations[language];

  return (
      <SafeAreaView
          style={[
            styles.container,
            {backgroundColor: currentTheme.backgroundColor}, // Use currentTheme for background color
          ]}>
        <Text style={[styles.date, {color: currentTheme.textColor}]}>
          {currentDate}
        </Text>
        <Text style={styles.taskSummary}>
          {t.taskSummary(
              tasks.filter(task => !task.completed).length,
              tasks.filter(task => task.completed).length,
          )}
        </Text>

        <View
            style={[
              styles.line,
              {borderBottomColor: currentTheme.borderBottomColor}, // Use currentTheme for border color
            ]}
        />
        <View style={styles.taskContainer}>
          <TaskList
              tasks={tasks}
              markTaskComplete={markTaskComplete}
              deleteTask={deleteTask}
              translations={t}
              currentTheme={currentTheme} // Pass currentTheme to TaskList component
          />
          {showInput ? (
              <TaskInputForm
                  newTask={newTask}
                  setIsVisible={setShowInput}
                  setNewTask={setNewTask}
                  addTask={addTask}
                  currentTheme={currentTheme} // Pass currentTheme to TaskInputForm component
              />
          ) : (
              <AddTaskButton toggleShowInput={() => setShowInput(true)} />
          )}
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  date: {
    marginBottom: 8,
    marginTop: 37,
    marginLeft: 16,
    fontSize: 32,
    fontWeight: 700,
  },
  line: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    paddingBottom: 5,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  taskSummary: {
    color: '#575767',
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 16,
  },
});

export default AddTaskScreen;
