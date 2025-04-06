import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../contexts/AuthContext';
import { useTheme } from '@rneui/themed';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('Requerido'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
});

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const { theme } = useTheme();
  const [error, setError] = useState('');

  const handleLogin = async (values) => {
    try {
      const success = await login(values.email, values.password);
      if (!success) {
        setError('Credenciales inválidas');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>Iniciar Sesión</Text>
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.formContainer}>
            <Input
              placeholder="Email"
              leftIcon={{ type: 'material-community', name: 'email', color: theme.colors.grey4 }}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              errorMessage={touched.email && errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Input
              placeholder="Contraseña"
              leftIcon={{ type: 'material-community', name: 'lock', color: theme.colors.grey4 }}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              errorMessage={touched.password && errors.password}
              secureTextEntry
            />
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <Button
              title="Iniciar Sesión"
              onPress={handleSubmit}
              containerStyle={styles.buttonContainer}
              loading={false}
            />
            
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                ¿No tienes cuenta? Regístrate
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
  },
  linkText: {
    marginTop: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});