import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AddTaskScreen from './src/screens/AddTaskScreen';
import EmptyScreen from './src/screens/EmptyScreen';
import {ThemeProvider} from './src/context/ThemeContext';
import {LanguageProvider} from './src/context/LanguageContext';
import MyTabBar from "./src/components/tabBar";

const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NavigationContainer>
          <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown:false,
            tabBarHideOnKeyboard:true,

        })}
            tabBar={(props) => <MyTabBar {...props} />}
                >
            <Tab.Screen
              name="AddTask"

              component={AddTaskScreen}
              options={{tabBarLabel: 'Task List', tabBarHideOnKeyboard:true}}
            />
            <Tab.Screen
              name="EmptyTab"
              component={EmptyScreen}
              options={{tabBarLabel: 'Settings',  tabBarHideOnKeyboard:true}}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
