import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import MovieForm from '../../components/Movies/MovieForm';
import { MovieContext } from '../../contexts/MovieContext';

export default function EditMovieScreen({ route, navigation }) {
  const { movie } = route.params;
  const { updateMovie } = useContext(MovieContext);

  const handleSubmit = async (updatedMovie) => {
    await updateMovie(movie.id, updatedMovie);
    navigation.goBack();
  };

  return (
    <MovieForm
      initialValues={movie}
      onSubmit={handleSubmit}
      onCancel={() => navigation.goBack()}
      isEdit={true}
    />
  );
}

const styles = StyleSheet.create({});