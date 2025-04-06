import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const authContext = {
    login: async (email, password) => {
      // Lógica de login simulada
      if (email && password) {
        const token = `fake-jwt-token-${email}`;
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
        return true;
      }
      return false;
    },
    register: async (email, password) => {
      // Lógica de registro simulada
      if (email && password) {
        const token = `fake-jwt-token-${email}`;
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
        return true;
      }
      return false;
    },
    logout: async () => {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    },
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Failed to load token', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authContext, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};