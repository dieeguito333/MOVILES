import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MovieForm from '../../components/Movies/MovieForm';
import { MovieContext } from '../../contexts/MovieContext';
import { useTheme } from '@rneui/themed';

export default function AddMovieScreen({ navigation }) {
  const { addMovie } = useContext(MovieContext);
  const { theme } = useTheme();

  const handleSubmit = async (movie) => {
    await addMovie(movie);
    navigation.goBack();
  };

  return (
    <MovieForm
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
    />
  );
}

const styles = StyleSheet.create({});