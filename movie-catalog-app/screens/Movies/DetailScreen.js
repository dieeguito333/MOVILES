import React, { useState, useContext } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Rating, Input, Button, Icon } from '@rneui/themed';
import { MovieContext } from '../../contexts/MovieContext';

export default function DetailScreen({ route, navigation }) {
  const { movie } = route.params;
  const { addReview, deleteReview, updateReview } = useContext(MovieContext);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(3);
  const [editingReview, setEditingReview] = useState(null);

  const handleAddReview = () => {
    if (newReview.trim()) {
      addReview(movie.id, {
        text: newReview,
        rating: newRating,
      });
      setNewReview('');
      setNewRating(3);
    }
  };

  const handleUpdateReview = (reviewId) => {
    if (newReview.trim()) {
      updateReview(movie.id, reviewId, {
        text: newReview,
        rating: newRating,
      });
      setEditingReview(null);
      setNewReview('');
      setNewRating(3);
    }
  };

  const startEditing = (review) => {
    setEditingReview(review.id);
    setNewReview(review.text);
    setNewRating(review.rating);
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: movie.image }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        
        <View style={styles.ratingContainer}>
          <Rating
            type="star"
            readonly
            startingValue={movie.rating}
            imageSize={25}
            style={styles.rating}
            tintColor="#ffffff"
          />
          <Text style={styles.ratingText}>
            {movie.rating.toFixed(1)}/5
          </Text>
        </View>
        
        <Text style={styles.sectionTitle}>Sinopsis:</Text>
        <Text style={styles.synopsis}>{movie.synopsis}</Text>
        
        <Text style={styles.sectionTitle}>Reseñas:</Text>
        
        {/* Formulario de reseña */}
        <View style={styles.reviewForm}>
          <Input
            placeholder="Escribe tu reseña"
            value={newReview}
            onChangeText={setNewReview}
            multiline
            inputStyle={styles.blackText}
            containerStyle={styles.inputContainer}
          />
          <View style={styles.reviewRatingContainer}>
            <Text style={[styles.ratingLabel, styles.blackText]}>Tu calificación:</Text>
            <Rating
              type="star"
              startingValue={newRating}
              onFinishRating={setNewRating}
              imageSize={25}
              fractions={1}
              tintColor="#ffffff"
            />
          </View>
          <Button
            title={editingReview ? "Actualizar Reseña" : "Agregar Reseña"}
            onPress={() => editingReview ? 
              handleUpdateReview(editingReview) : handleAddReview()}
            buttonStyle={styles.reviewButton}
          />
          {editingReview && (
            <Button
              title="Cancelar"
              onPress={() => {
                setEditingReview(null);
                setNewReview('');
                setNewRating(3);
              }}
              type="outline"
              buttonStyle={styles.cancelButton}
              titleStyle={styles.blackText}
            />
          )}
        </View>
        
        {/* Lista de reseñas */}
        {movie.reviews?.map((review) => (
          <View key={review.id} style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Rating
                type="star"
                readonly
                startingValue={review.rating}
                imageSize={15}
                tintColor="#ffffff"
              />
              <View style={styles.reviewActions}>
                <TouchableOpacity onPress={() => startEditing(review)}>
                  <Icon
                    name="pencil"
                    type="material-community"
                    color="#000000"
                    size={20}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteReview(movie.id, review.id)}>
                  <Icon
                    name="delete"
                    type="material-community"
                    color="#ff0000"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.reviewText, styles.blackText]}>{review.text}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    color: '#000000',
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
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    color: '#000000',
  },
  reviewForm: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  reviewRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  reviewButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    marginTop: 10,
  },
  cancelButton: {
    borderColor: '#6200EE',
    borderRadius: 8,
    marginTop: 10,
  },
  reviewItem: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 15,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  blackText: {
    color: '#000000',
  },
});