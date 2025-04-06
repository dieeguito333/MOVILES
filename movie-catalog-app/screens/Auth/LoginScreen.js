import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
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
        setError('Credenciales incorrectas');
      }
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.innerContainer}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>CinePlus</Text>
        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
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
              
              {error ? <Text style={[styles.errorText, { color: theme.colors.error }]}>{error}</Text> : null}
              
              <Button
                title="Iniciar Sesión"
                onPress={handleSubmit}
                buttonStyle={[styles.button, { backgroundColor: theme.colors.primary }]}
                titleStyle={{ color: theme.colors.onPrimary }}
                containerStyle={styles.buttonContainer}
              />
              
              <TouchableOpacity 
                onPress={() => navigation.navigate('Register')}
                style={styles.linkContainer}
              >
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                  ¿No tienes cuenta? Regístrate
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
    fontSize: 32,
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