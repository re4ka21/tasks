import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTaskScreen from './src/screens/AddTaskScreen';
import ListScreen from './src/screens/ListScreen';
import EmptyScreen from './src/screens/EmptyScreen';
import {ThemeProvider} from './src/context/ThemeContext';
import {LanguageProvider} from './src/context/LanguageContext';
import MyTabBar from './src/components/tabBar';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              headerShown: false,
              tabBarHideOnKeyboard: true,
            })}
            tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{
                tabBarLabel: <Icon name="list-alt" size={30} color="#000" />,
                tabBarHideOnKeyboard: true,
              }}
            />
            <Tab.Screen
              name="NotesTab"
              component={ListScreen}
              options={{
                tabBarLabel: <Icon name="book" size={30} color="#000" />,
                tabBarHideOnKeyboard: true,
              }}
            />
            <Tab.Screen
              name="EmptyTab"
              component={EmptyScreen}
              options={{
                tabBarLabel: <Icon name="cog" size={30} color="#000" />,
                tabBarHideOnKeyboard: true,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
