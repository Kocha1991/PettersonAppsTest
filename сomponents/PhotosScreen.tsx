import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import PhotoItem from './PhotoItem';
import { Photo } from '../types/types';
import { useRefresh } from '../hooks/useRefresh';

const PhotosScreen: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos');
      const data: Photo[] = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const { refreshing, onRefresh } = useRefresh(fetchPhotos);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      style={styles.container}
      data={photos}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PhotoItem
          id={item.id}
          thumbnailUrl={item.thumbnailUrl}
          title={item.title || 'No description'}
        />
      )}
      numColumns={2}
      contentContainerStyle={styles.contentContainer}
      columnWrapperStyle={styles.columnWrapper}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 5,
    
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default PhotosScreen;
