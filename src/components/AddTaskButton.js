import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const AddTaskButton = ({toggleShowInput}) => {
  const {width} = Dimensions.get('window');

  return (
    <TouchableOpacity
      style={[styles.addButton, {right: width * 0.05}]}
      onPress={toggleShowInput}>
      <Text style={styles.addButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    bottom: 20, // Відступ від нижнього краю
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: '#515CC6',
    borderWidth: 3,
    backgroundColor: '#3F4EA0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 40,
  },
});

export default AddTaskButton;
