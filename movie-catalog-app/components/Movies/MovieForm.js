import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, Button, Text, Rating } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ImagePicker from '../Auth/Common/ImagePicker';
import { useTheme } from '@rneui/themed';

const MovieSchema = Yup.object().shape({
  title: Yup.string().required('El título es requerido'),
  synopsis: Yup.string().required('La sinopsis es requerida'),
});

export default function MovieForm({ 
  initialValues = {}, 
  onSubmit, 
  onCancel,
  isEdit = false 
}) {
  const { theme } = useTheme();
  const [image, setImage] = useState(initialValues.image || null);
  const [currentRating, setCurrentRating] = useState(initialValues.rating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (rating) => {
    setCurrentRating(rating);
  };

  const handleSubmit = async (values) => {
    if (!image && !isEdit) {
      Alert.alert('Error', 'Por favor selecciona una imagen');
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({
        ...values,
        image,
        rating: currentRating
      });
      if (!isEdit) {
        setImage(null);
        setCurrentRating(0);
      }
    } catch (error) {
      console.error('Error submitting movie:', error);
      Alert.alert('Error', 'No se pudo guardar la película');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Formik
        initialValues={{
          title: initialValues.title || '',
          synopsis: initialValues.synopsis || '',
        }}
        validationSchema={MovieSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <ImagePicker 
              image={image} 
              onImageSelected={setImage} 
              placeholderText="Seleccionar imagen de película"
            />
            
            <Input
              placeholder="Título"
              leftIcon={{ type: 'material-community', name: 'format-title', color: '#000000' }}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              errorMessage={touched.title && errors.title}
              inputStyle={styles.blackText}
              labelStyle={styles.blackText}
            />
            
            <Input
              placeholder="Sinopsis"
              leftIcon={{ type: 'material-community', name: 'text', color: '#000000' }}
              onChangeText={handleChange('synopsis')}
              onBlur={handleBlur('synopsis')}
              value={values.synopsis}
              errorMessage={touched.synopsis && errors.synopsis}
              multiline
              numberOfLines={4}
              inputStyle={styles.blackText}
              labelStyle={styles.blackText}
            />
            
            <View style={styles.ratingSection}>
              <Text style={[styles.ratingLabel, styles.blackText]}>Calificación:</Text>
              <View style={styles.ratingContainer}>
                <Rating
                  type="star"
                  ratingCount={5}
                  imageSize={40}
                  startingValue={currentRating}
                  onFinishRating={handleRatingChange}
                  fractions={1}
                  tintColor={theme.colors.background}
                  ratingColor="#FFD700"
                  ratingBackgroundColor="#c8c7c8"
                />
                <Text style={[styles.ratingText, styles.blackText]}>
                  {currentRating.toFixed(1)}/5
                </Text>
              </View>
            </View>
            
            <View style={styles.buttonGroup}>
              <Button
                title="Cancelar"
                onPress={onCancel}
                type="outline"
                buttonStyle={[styles.button, { borderColor: theme.colors.primary }]}
                titleStyle={{ color: theme.colors.primary }}
                containerStyle={styles.buttonContainer}
                disabled={isSubmitting}
              />
              <Button
                title={isEdit ? 'Actualizar' : 'Guardar'}
                onPress={handleSubmit}
                buttonStyle={[styles.button, { backgroundColor: theme.colors.primary }]}
                containerStyle={styles.buttonContainer}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  formContainer: {
    paddingBottom: 20,
  },
  ratingSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  blackText: {
    color: '#000000',
  },
});