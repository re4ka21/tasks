import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTaskScreen from './src/screens/AddTaskScreen';
import EmptyScreen from './src/screens/EmptyScreen';
import {ThemeProvider} from './src/context/ThemeContext';
import {LanguageProvider} from './src/context/LanguageContext';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarLabelStyle: {
                fontSize: 22,
                marginBottom: 9,
                fontWeight: 'bold',
              },
              tabBarStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
                borderTopWidth: 0,
              },
              tabBarActiveTintColor: 'blue',
              tabBarInactiveTintColor: 'gray',
              tabBarIcon: () => null,
            }}>
            <Tab.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{tabBarLabel: 'Task List'}}
            />
            <Tab.Screen
              name="EmptyTab"
              component={EmptyScreen}
              options={{tabBarLabel: 'Settings'}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
