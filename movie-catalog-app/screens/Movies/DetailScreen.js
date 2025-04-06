import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Rating } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

export default function DetailScreen({ route }) {
  const { movie } = route.params;
  const { theme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image 
        source={{ uri: movie.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>{movie.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            readonly
            startingValue={movie.rating}
            imageSize={25}
            style={styles.rating}
          />
          <Text style={[styles.ratingText, { color: theme.colors.onBackground }]}>
            {movie.rating.toFixed(1)}/5
          </Text>
        </View>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Sinopsis:</Text>
        <Text style={[styles.synopsis, { color: theme.colors.grey5 }]}>{movie.synopsis}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    marginRight: 10,
  },
  ratingText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 24,
  },
});