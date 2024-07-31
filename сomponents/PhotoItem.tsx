import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface PhotoItemProps {
  thumbnailUrl: string;
  title: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ thumbnailUrl, title }) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const toggleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '49%',
    padding: 3,
    borderWidth: 1,
    borderStyle: 'solid',
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
