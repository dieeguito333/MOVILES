import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../contexts/AuthContext';
import AuthStack from './AuthStack';
import MainTabNavigator from './MainTabNavigator';
import LoadingScreen from '../screens/Auth/LoadingScreen';
import DetailScreen from '../screens/Movies/DetailScreen';
import EditMovieScreen from '../screens/Movies/EditMovieScreen';

const RootStack = createNativeStackNavigator();

function MoviesStack() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }} 
      />
      <RootStack.Screen 
        name="Detail" 
        component={DetailScreen}
        options={({ route }) => ({ 
          title: route.params.movie.title,
          headerBackTitle: 'Atrás'
        })}
      />
      <RootStack.Screen 
        name="EditMovie" 
        component={EditMovieScreen}
        options={{ 
          title: 'Editar Película',
          headerBackTitle: 'Atrás'
        }}
      />
    </RootStack.Navigator>
  );
}

export default function AppNavigator() {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userToken ? (
          <RootStack.Screen name="App" component={MoviesStack} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthStack} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}