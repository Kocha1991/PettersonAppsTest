import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../types/store';
import { addFavorite, removeFavorite, addDislikedPhoto, removeDislikedPhoto } from '../types/favoritesSlice';
import FullscreenImageModal from './FullscreenImageModal';

interface PhotoItemProps {
  thumbnailUrl: string;
  title: string;
  id: number;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ thumbnailUrl, title, id }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const dislikedPhotos = useSelector((state: RootState) => state.favorites.dislikedPhotos);

  const isFavorite = favorites.some(photo => photo.id === id);
  const isDisliked = dislikedPhotos.includes(id);

  const [liked, setLiked] = useState(isFavorite);
  const [disliked, setDisliked] = useState(isDisliked);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setLiked(isFavorite);
  }, [isFavorite]);

  useEffect(() => {
    setDisliked(isDisliked);
  }, [isDisliked]);

  const toggleLike = () => {
    if (!liked) {
      setLiked(true);
      setDisliked(false);
      dispatch(addFavorite({ id, thumbnailUrl, title, albumId: 0, url: '' }));
      dispatch(removeDislikedPhoto(id));
    } else {
      setLiked(false);
      dispatch(removeFavorite(id));
    }
  };

  const toggleDislike = () => {
    if (!disliked) {
      setDisliked(true);
      setLiked(false);
      dispatch(addDislikedPhoto(id));
      if (isFavorite) {
        dispatch(removeFavorite(id));
      }
    } else {
      setDisliked(false);
      dispatch(removeDislikedPhoto(id));
    }
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal}>
        <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.likedContainer}>
          <TouchableOpacity onPress={toggleLike}>
            <Icon
              name={liked ? 'thumb-up' : 'thumb-up-off-alt'}
              type='material'
              color={liked ? 'green' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDislike}>
            <Icon
              name={disliked ? 'thumb-down' : 'thumb-down-off-alt'}
              type='material'
              color={disliked ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FullscreenImageModal
        visible={isModalVisible}
        imageUrl={thumbnailUrl}
        onClose={closeModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '49%',
    padding: 3,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 5,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
  },
  likedContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  }
});

export default PhotoItem;
