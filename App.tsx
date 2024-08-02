import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { Provider, useDispatch } from 'react-redux';
import { store } from './types/store';
import { setFavorites, setDislikedPhotos } from './types/favoritesSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PhotosScreen from './сomponents/PhotosScreen';
import FavoritesScreen from './сomponents/FavoritesScreen';

const Tab = createBottomTabNavigator();

const LoadData: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        if (jsonValue != null) {
          const savedFavorites = JSON.parse(jsonValue);
          dispatch(setFavorites(savedFavorites));
        }
      } catch (e) {
        console.error('Failed to load favorites:', e);
      }
    };

    const loadDislikedPhotos = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('dislikedPhotos');
        if (jsonValue != null) {
          const savedDislikedPhotos = JSON.parse(jsonValue);
          dispatch(setDislikedPhotos(savedDislikedPhotos));
        }
      } catch (e) {
        console.error('Failed to load disliked photos:', e);
      }
    };

    loadFavorites();
    loadDislikedPhotos();
  }, [dispatch]);

  return null;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <LoadData />
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
