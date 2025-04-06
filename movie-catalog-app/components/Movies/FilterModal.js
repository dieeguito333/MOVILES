import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Overlay, Icon, Slider } from '@rneui/themed';
import { useTheme } from '@rneui/themed';

const FilterModal = ({ 
  isVisible, 
  onClose, 
  sortOption, 
  onSelectSort, 
  minRating = 0, 
  onRatingFilter = () => {} 
}) => {
  const { theme } = useTheme();
  const [ratingFilter, setRatingFilter] = useState(minRating);

  const sortOptions = [
    { key: null, label: 'Sin orden' },
    { key: 'title', label: 'Por título (A-Z)' },
    { key: 'rating', label: 'Por calificación' },
    { key: 'newest', label: 'Más recientes' },
    { key: 'oldest', label: 'Más antiguas' },
  ];

  const handleApply = () => {
    onRatingFilter(ratingFilter);
    onClose();
  };

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onClose}
      overlayStyle={[styles.overlay, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Filtrar Películas</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Ordenar por:</Text>
          {sortOptions.map(option => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.option, 
                sortOption === option.key && { 
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: theme.colors.primary,
                }
              ]}
              onPress={() => onSelectSort(option.key)}
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
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
            Calificación mínima: {ratingFilter.toFixed(1)}
          </Text>
          <Slider
            value={ratingFilter}
            onValueChange={setRatingFilter}
            maximumValue={5}
            minimumValue={0}
            step={0.5}
            thumbStyle={{ height: 20, width: 20, backgroundColor: theme.colors.primary }}
            trackStyle={{ height: 6, borderRadius: 3 }}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.grey2}
          />
        </View>
        
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.grey3 }]}
            onPress={onClose}
          >
            <Text style={[styles.buttonText, { color: theme.colors.onBackground }]}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleApply}
          >
            <Text style={[styles.buttonText, { color: theme.colors.onPrimary }]}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

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
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FilterModal;