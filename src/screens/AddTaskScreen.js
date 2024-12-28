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
};

const AddTaskScreen = () => {
  const {language} = useContext(LanguageContext);
  const {isDarkTheme} = useContext(ThemeContext);
  const [currentDate, setCurrentDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

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
        {backgroundColor: isDarkTheme ? '#141419' : '#F8F8F8'},
      ]}>
      <Text style={[styles.date, {color: isDarkTheme ? 'white' : 'black'}]}>
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
          {borderBottomColor: isDarkTheme ? '#D0D0D0' : '#575767'},
        ]}
      />
      <View style={styles.taskContainer}>
        <TaskList
          tasks={tasks}
          markTaskComplete={markTaskComplete}
          deleteTask={deleteTask}
          translations={t}
        />
        {showInput ? (
          <TaskInputForm
            newTask={newTask}
            setNewTask={setNewTask}
            addTask={addTask}
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
