import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import PhotoItem from './PhotoItem';
import { useSelector } from 'react-redux';
import { RootState } from '../types/store';


const FavoritesScreen: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.text}>No favorite pictures...</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PhotoItem
              thumbnailUrl={item.thumbnailUrl}
              title={item.title}
              id={item.id}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  contentContainer: {
    padding: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center'
  }
});

export default FavoritesScreen;
