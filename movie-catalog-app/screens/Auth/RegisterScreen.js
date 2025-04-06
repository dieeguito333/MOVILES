import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '@rneui/themed';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string()
    .min(6, 'Mínimo 6 caracteres')
    .matches(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .matches(/[0-9]/, 'Debe contener al menos un número')
    .required('Requerido'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
    .required('Requerido'),
});

export default function RegisterScreen({ navigation }) {
  const { register, users } = useContext(AuthContext);
  const { theme } = useTheme();
  const [error, setError] = useState('');

  const handleRegister = async (values) => {
    try {
      await register(values.email, values.password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Registro</Text>
        
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
              <Input
                placeholder="Email"
                leftIcon={{ type: 'material-community', name: 'email', color: theme.colors.grey3 }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={touched.email && errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                inputStyle={{ color: theme.colors.onBackground }}
                placeholderTextColor={theme.colors.grey4}
              />
              
              <Input
                placeholder="Contraseña"
                leftIcon={{ type: 'material-community', name: 'lock', color: theme.colors.grey3 }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                errorMessage={touched.password && errors.password}
                secureTextEntry
                inputStyle={{ color: theme.colors.onBackground }}
                placeholderTextColor={theme.colors.grey4}
              />
              
              <Input
                placeholder="Confirmar Contraseña"
                leftIcon={{ type: 'material-community', name: 'lock-check', color: theme.colors.grey3 }}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                errorMessage={touched.confirmPassword && errors.confirmPassword}
                secureTextEntry
                inputStyle={{ color: theme.colors.onBackground }}
                placeholderTextColor={theme.colors.grey4}
              />
              
              {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
              
              <Button
                title="Registrarse"
                onPress={handleSubmit}
                buttonStyle={[styles.button, { backgroundColor: theme.colors.primary }]}
                titleStyle={{ color: theme.colors.onPrimary }}
                containerStyle={styles.buttonContainer}
              />
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
                style={styles.linkContainer}
              >
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                  ¿Ya tienes cuenta? Inicia Sesión
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  linkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorText: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});