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
  rating: Yup.number()
    .min(0, 'La calificación mínima es 0')
    .max(5, 'La calificación máxima es 5')
    .required('La calificación es requerida'),
});

export default function MovieForm({ 
  initialValues, 
  onSubmit, 
  onCancel,
  isEdit = false 
}) {
  const { theme } = useTheme();
  const [image, setImage] = useState(initialValues?.image || null);

  const handleSubmit = (values) => {
    if (!image && !isEdit) {
      Alert.alert('Error', 'Por favor selecciona una imagen');
      return;
    }
    onSubmit({ ...values, image });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Formik
        initialValues={{
          title: initialValues?.title || '',
          synopsis: initialValues?.synopsis || '',
          rating: initialValues?.rating || 0,
        }}
        validationSchema={MovieSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <ImagePicker 
              image={image} 
              onImageSelected={setImage} 
              placeholderText="Seleccionar imagen de película"
            />
            
            <Input
              placeholder="Título"
              leftIcon={{ type: 'material-community', name: 'format-title', color: theme.colors.grey4 }}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              errorMessage={touched.title && errors.title}
            />
            
            <Input
              placeholder="Sinopsis"
              leftIcon={{ type: 'material-community', name: 'text', color: theme.colors.grey4 }}
              onChangeText={handleChange('synopsis')}
              onBlur={handleBlur('synopsis')}
              value={values.synopsis}
              errorMessage={touched.synopsis && errors.synopsis}
              multiline
              numberOfLines={4}
            />
            
            <View style={styles.ratingContainer}>
              <Text style={[styles.ratingLabel, { color: theme.colors.grey5 }]}>Calificación:</Text>
              <Rating
                type="star"
                ratingCount={5}
                imageSize={30}
                startingValue={values.rating}
                onFinishRating={(value) => setFieldValue('rating', value)}
                style={styles.rating}
              />
              {touched.rating && errors.rating && (
                <Text style={[styles.errorText, { color: theme.colors.error }]}>
                  {errors.rating}
                </Text>
              )}
            </View>
            
            <View style={styles.buttonGroup}>
              <Button
                title="Cancelar"
                onPress={onCancel}
                type="outline"
                buttonStyle={[styles.button, { borderColor: theme.colors.primary }]}
                titleStyle={{ color: theme.colors.primary }}
                containerStyle={styles.buttonContainer}
              />
              <Button
                title={isEdit ? 'Actualizar' : 'Guardar'}
                onPress={handleSubmit}
                buttonStyle={styles.button}
                containerStyle={styles.buttonContainer}
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
  ratingContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  ratingLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  rating: {
    alignSelf: 'flex-start',
  },
  errorText: {
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 8,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
});