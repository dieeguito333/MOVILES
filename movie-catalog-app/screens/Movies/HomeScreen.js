import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { Icon, SearchBar } from '@rneui/themed';
import { MovieContext } from '../../contexts/MovieContext';
import MovieCard from '../../components/Movies/MovieCard';
import FilterModal from '../../components/Movies/FilterModal';
import { useTheme } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  const { filteredMovies, isLoading, filterMovies } = useContext(MovieContext);
  const [search, setSearch] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    filterMovies(search, sortOption);
  }, [search, sortOption]);

  const handleMoviePress = (movie) => {
    navigation.navigate('Detail', { movie });
  };

  const handleEdit = (movie) => {
    navigation.navigate('EditMovie', { movie });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <SearchBar
        placeholder="Buscar películas..."
        onChangeText={setSearch}
        value={search}
        platform="default"
        containerStyle={styles.searchContainer}
        inputContainerStyle={[styles.searchInput, { backgroundColor: theme.colors.grey1 }]}
        inputStyle={[styles.searchText, { color: theme.colors.onBackground }]}
      />
      
      <TouchableOpacity 
        onPress={() => setIsFilterVisible(true)}
        style={[styles.filterButton, { backgroundColor: theme.colors.primary }]}
      >
        <Icon 
          type="material-community" 
          name="filter" 
          color={theme.colors.onPrimary} 
        />
        <Text style={[styles.filterText, { color: theme.colors.onPrimary }]}>
          Filtrar
        </Text>
      </TouchableOpacity>
      
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            onEdit={() => handleEdit(item)}
            onDelete={(id) => deleteMovie(id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon 
              type="material-community" 
              name="movie-open-off" 
              size={50} 
              color={theme.colors.grey4} 
            />
            <Text style={[styles.emptyText, { color: theme.colors.grey5 }]}>
              No hay películas para mostrar
            </Text>
          </View>
        }
      />
      
      <FilterModal
        isVisible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        sortOption={sortOption}
        onSelectSort={setSortOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    marginBottom: 10,
    padding: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  searchInput: {
    borderRadius: 8,
    height: 40,
  },
  searchText: {
    fontSize: 14,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  filterText: {
    marginLeft: 8,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
  },
});