import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from '@rneui/themed';

export default function LoadingScreen() {
  const { theme } = useTheme();
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}