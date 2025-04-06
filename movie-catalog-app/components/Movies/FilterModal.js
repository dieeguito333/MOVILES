import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Overlay, Icon } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

export default function FilterModal({ isVisible, onClose, sortOption, onSelectSort }) {
  const { theme } = useTheme();

  const sortOptions = [
    { key: null, label: 'Sin orden' },
    { key: 'title', label: 'Por título (A-Z)' },
    { key: 'rating', label: 'Por calificación' },
  ];

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={[styles.overlay, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Opciones de Filtrado</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Ordenar por:</Text>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option, 
                sortOption === option.key && { 
                  backgroundColor: theme.colors.primary + '20',
                  borderColor: theme.colors.primary,
                }
              ]}
              onPress={() => {
                onSelectSort(option.key);
                onClose();
              }}
            >
              <Text style={[styles.optionText, { color: theme.colors.onBackground }]}>
                {option.label}
              </Text>
              {sortOption === option.key && (
                <Icon 
                  type="material-community" 
                  name="check" 
                  color={theme.colors.primary} 
                  size={20} 
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity
          style={[styles.closeButton, { backgroundColor: theme.colors.primary }]}
          onPress={onClose}
        >
          <Text style={[styles.closeButtonText, { color: theme.colors.onPrimary }]}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: '90%',
    borderRadius: 10,
    padding: 20,
  },
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
  },
  closeButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});