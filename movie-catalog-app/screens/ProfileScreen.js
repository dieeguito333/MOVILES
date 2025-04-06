import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '@rneui/themed';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '@rneui/themed';

export default function ProfileScreen() {
  const { logout, userToken } = useContext(AuthContext);
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.onBackground }]}>Perfil</Text>
      <Text style={[styles.email, { color: theme.colors.grey5 }]}>
        {userToken ? `Usuario: ${userToken.replace('fake-jwt-token-', '')}` : 'No autenticado'}
      </Text>
      
      <Button
        title="Cerrar Sesión"
        onPress={logout}
        buttonStyle={{ backgroundColor: theme.colors.error }}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 30,
  },
  buttonContainer: {
    marginTop: 20,
  },
});