import React from 'react';
import MovieForm from '../../components/Movies/MovieForm';

export default function EditMovieScreen({ route, navigation }) {
  const { movie } = route.params;

  const handleSubmit = (updatedMovie) => {
    // La lógica de actualización se manejará en el componente que usa este screen
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