import React from 'react';
import { ThemeProvider } from '@rneui/themed';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './styles/theme';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <MovieProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </MovieProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}