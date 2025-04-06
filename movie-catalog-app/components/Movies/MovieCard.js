import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Icon } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

const placeholderImage = require('../../assets/images/placeholder.jpg');

export default function MovieCard({ movie, onPress, onEdit, onDelete }) {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.card, { backgroundColor: theme.colors.surface }]}
    >
      <Image 
        source={movie.image ? { uri: movie.image } : placeholderImage} 
        style={styles.image} 
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>{movie.title}</Text>
        <View style={styles.ratingContainer}>
          <Icon 
            type="material-community" 
            name="star" 
            size={20} 
            color={theme.colors.secondary} 
          />
          <Text style={[styles.rating, { color: theme.colors.onBackground }]}>
            {movie.rating.toFixed(1)}
          </Text>
        </View>
        <Text 
          style={[styles.synopsis, { color: theme.colors.grey5 }]} 
          numberOfLines={2}
        >
          {movie.synopsis}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(movie)} style={styles.actionButton}>
          <Icon 
            type="material-community" 
            name="pencil" 
            size={24} 
            color={theme.colors.primary} 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(movie.id)} style={styles.actionButton}>
          <Icon 
            type="material-community" 
            name="delete" 
            size={24} 
            color={theme.colors.error} 
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    height: 120,
  },
  image: {
    width: 100,
    height: '100%',
  },
  content: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
  },
  synopsis: {
    fontSize: 12,
    marginTop: 5,
  },
  actions: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    padding: 10,
  },
  actionButton: {
    padding: 5,
  },
});