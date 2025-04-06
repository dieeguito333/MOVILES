import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([
    { email: 'admin@cine.com', password: 'Admin123' },
    { email: 'usuario@cine.com', password: 'Usuario123' },
    { email: 'invitado@cine.com', password: 'Invitado123' }
  ]);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUsers = await AsyncStorage.getItem('appUsers');
        
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
        
        setUserToken(storedToken);
      } catch (e) {
        console.error('Failed to load data', e);
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = {
    login: async (email, password) => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        const token = `auth-${Date.now()}`;
        await AsyncStorage.setItem('userToken', token);
        setUserToken(token);
        return true;
      }
      return false;
    },
    register: async (email, password) => {
      if (users.some(u => u.email === email)) {
        throw new Error('El correo ya está registrado');
      }
      
      const newUsers = [...users, { email, password }];
      setUsers(newUsers);
      await AsyncStorage.setItem('appUsers', JSON.stringify(newUsers));
      
      const token = `auth-${Date.now()}`;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      return true;
    },
    logout: async () => {
      await AsyncStorage.removeItem('userToken');
      setUserToken(null);
    },
    users 
  };

  return (
    <AuthContext.Provider value={{ ...authContext, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};