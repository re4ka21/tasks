import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {ThemeContext} from '../context/ThemeContext';

const TaskItem = ({item, markTaskComplete, deleteTask}) => {
  const {isDarkTheme} = useContext(ThemeContext);

  return (
    <View style={[styles.taskItem, item.completed && styles.completedTask]}>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[
            styles.completeButton,
            {backgroundColor: isDarkTheme ? '#2B2D37' : '#FCFCFC'},
            {borderColor: isDarkTheme ? '#0E0E11' : '#DADADA'},
          ]}
          onPress={() => markTaskComplete(item.id)}>
          <Text
            style={[
              styles.completeButtonText,
              {color: isDarkTheme ? 'white' : 'black'},
            ]}>
            {item.completed ? '✔' : '  '}
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.taskText,
            {color: isDarkTheme ? 'white' : 'black'},
            item.completed && styles.completedTaskText,
          ]}>
          {item.text}
        </Text>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTask(item.id)}>
          <Text style={styles.deleteButtonText}>✘</Text>
        </TouchableOpacity>
      </View>

      {!item.completed && (
        <Text
          style={[
            styles.themeText,
            {color: isDarkTheme ? 'gray' : 'darkgray'},
          ]}>
          {item.theme}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    marginBottom: 16,
    borderRadius: 5,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskText: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
  },
  themeText: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 38,
  },
  completedTaskText: {
    color: 'gray',
  },
  completeButton: {
    padding: 5,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
});

export default TaskItem;
