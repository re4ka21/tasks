import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({tasks, markTaskComplete, deleteTask, translations}) => {
  const sections = [
    {
      title: translations.incomplete,
      data: tasks.filter(task => !task.completed),
    },
    {
      title: translations.completed,
      data: tasks.filter(task => task.completed),
    },
  ];

  return (
    <SectionList
      sections={sections}
      keyExtractor={item => item.id}
      renderItem={({item}) => (
        <TaskItem
          item={item}
          markTaskComplete={markTaskComplete}
          deleteTask={deleteTask}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.headerContainer}>
          <Text style={styles.sectionHeader}>{title}</Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.emptyText}>{translations.emptyList}</Text>
      }
    />
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: 'gray',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default TaskList;
