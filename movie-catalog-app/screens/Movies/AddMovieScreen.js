import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MovieForm from '../../components/Movies/MovieForm';
import { MovieContext } from '../../contexts/MovieContext';
import { useTheme } from '@rneui/themed';

export default function AddMovieScreen({ navigation }) {
  const { addMovie } = useContext(MovieContext);

  const handleSubmit = async (movie) => {
    try {
      const newMovie = await addMovie(movie);
      if (newMovie) {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  return (
    <MovieForm
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({});