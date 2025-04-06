import React, { useContext, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { Rating, Icon } from '@rneui/themed';
import ReviewForm from '../../components/Movies/ReviewForm';
import { MovieContext } from '../../contexts/MovieContext';
import { useTheme } from '@rneui/themed';

export default function DetailScreen({ route }) {
  const { movie } = route.params;
  const { addReview } = useContext(MovieContext);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { theme } = useTheme();

  const handleAddReview = async (review) => {
    await addReview(movie.id, review);
    setShowReviewForm(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image 
        source={movie.image ? { uri: movie.image } : require('../../assets/placeholder.jpg')} 
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
        
        <View style={styles.reviewsHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Reseñas:</Text>
          <TouchableOpacity 
            onPress={() => setShowReviewForm(!showReviewForm)}
            style={styles.addReviewButton}
          >
            <Icon 
              type="material-community" 
              name={showReviewForm ? 'minus' : 'plus'} 
              size={20} 
              color={theme.colors.primary} 
            />
            <Text style={[styles.addReviewText, { color: theme.colors.primary }]}>
              {showReviewForm ? 'Cancelar' : 'Agregar reseña'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {showReviewForm && (
          <ReviewForm onSubmit={handleAddReview} />
        )}
        
        {movie.reviews && movie.reviews.length > 0 ? (
          movie.reviews.map((review, index) => (
            <View key={review.id} style={[
              styles.reviewContainer,
              index !== movie.reviews.length - 1 && styles.reviewSeparator,
              { borderColor: theme.colors.grey2 }
            ]}>
              <Rating
                type="star"
                readonly
                startingValue={review.rating}
                imageSize={15}
                style={styles.reviewRating}
              />
              <Text style={[styles.reviewText, { color: theme.colors.onBackground }]}>
                {review.text}
              </Text>
            </View>
          ))
        ) : (
          <Text style={[styles.noReviews, { color: theme.colors.grey4 }]}>
            No hay reseñas aún
          </Text>
        )}
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
    height: 250,
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
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 25,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addReviewText: {
    marginLeft: 5,
    fontSize: 14,
  },
  reviewContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  reviewSeparator: {
    borderBottomWidth: 1,
  },
  reviewRating: {
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
  },
  noReviews: {
    textAlign: 'center',
    marginVertical: 20,
    fontStyle: 'italic',
  },
});