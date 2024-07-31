import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';
import { store } from './types/store'; // Додати імпорт

import PhotosScreen from './сomponents/PhotosScreen';
import FavoritesScreen from './сomponents/FavoritesScreen';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                let iconName: string = '';

                if (route.name === 'Photos') {
                  iconName = 'photo';
                } else if (route.name === 'Favorites') {
                  iconName = 'favorite';
                }

                return <Icon name={iconName} size={size} color={color} type='material' />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen name="Photos" component={PhotosScreen} />
            <Tab.Screen name="Favorites" component={FavoritesScreen} />
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
  );
};

export default App;
