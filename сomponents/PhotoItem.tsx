import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

interface PhotoItemProps {
  thumbnailUrl: string;
  title: string;
}

const PhotoItem: React.FC<PhotoItemProps> = ({ thumbnailUrl, title }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnailUrl }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name={liked ? 'thumb-up' : 'thumb-up-off-alt'}
            type='material'
            color={liked ? 'tomato' : 'gray'}
          />
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
  },
  
});

export default PhotoItem;
