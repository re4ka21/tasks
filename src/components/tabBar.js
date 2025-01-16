import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {useLinkBuilder} from '@react-navigation/native';
import {PlatformPressable} from '@react-navigation/elements';
import {ThemeContext} from '../context/ThemeContext';

function MyTabBar({state, descriptors, navigation}) {
  const {buildHref} = useLinkBuilder();
  const {isDarkTheme} = useContext(ThemeContext); // Отримуємо тему з контексту

  return (
    <View
      style={{
        display: 'flex',
        minHeight: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: isDarkTheme ? '#1E1E24' : '#FFFFFF', // Фон табів
        borderTopWidth: 1,
        borderTopColor: isDarkTheme ? '#333' : '#ccc', // Лінія розділення
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index; // Перевіряємо, чи це активний таб

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View>
              {typeof label === 'string' ? (
                // Якщо label — це текст
                <Text
                  style={{
                    color: isFocused
                      ? isDarkTheme
                        ? '#ff9d26' // Активний таб у темній темі
                        : '#007AFF' // Активний таб у світлій темі
                      : isDarkTheme
                      ? '#AAAAAA' // Неактивний таб у темній темі
                      : '#8E8E93', // Неактивний таб у світлій темі
                    fontSize: 16,
                    fontWeight: isFocused ? 'bold' : 'normal', // Жирний текст для активного табу
                  }}>
                  {label}
                </Text>
              ) : (
                // Якщо label — це компонент (наприклад, іконка)
                React.cloneElement(label, {
                  color: isFocused
                    ? isDarkTheme
                      ? '#ff9d26'
                      : '#007AFF'
                    : isDarkTheme
                    ? '#AAAAAA'
                    : '#8E8E93',
                })
              )}
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

export default MyTabBar;
