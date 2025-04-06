import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Icon, SearchBar, Badge } from '@rneui/themed';
import { MovieContext } from '../../contexts/MovieContext';
import MovieCard from '../../components/Movies/MovieCard';
import FilterModal from '../../components/Movies/FilterModal';
import { useTheme } from '@rneui/themed';
import { Button } from '@rneui/themed';

export default function HomeScreen({ navigation }) {
  const { filteredMovies, isLoading, filterMovies, deleteMovie } = useContext(MovieContext);
  const [search, setSearch] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useTheme();
  const [minRatingFilter, setMinRatingFilter] = useState(0);

  useEffect(() => {
    filterMovies(search, sortOption);
  }, [search, sortOption]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await filterMovies(search, sortOption);
    setRefreshing(false);
  };

  const handleMoviePress = (movie) => {
    navigation.navigate('Detail', { movie });
  };

  const handleEdit = (movie) => {
    navigation.navigate('EditMovie', { movie });
  };

  const handleDelete = async (id) => {
    await deleteMovie(id);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.colors.onBackground }]}>Catálogo de Películas</Text>
        <Badge
          value={filteredMovies.length}
          status="primary"
          badgeStyle={{ backgroundColor: theme.colors.primary }}
          textStyle={{ color: theme.colors.onPrimary }}
        />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar películas..."
          onChangeText={setSearch}
          value={search}
          platform="default"
          containerStyle={styles.searchBarContainer}
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
            size={20}
          />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            onEdit={() => handleEdit(item)}
            onDelete={() => handleDelete(item.id)}
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
              {search ? 'No se encontraron resultados' : 'No hay películas para mostrar'}
            </Text>
            {!search && (
              <Button
                title="Agregar primera película"
                onPress={() => navigation.navigate('Add')}
                buttonStyle={{ backgroundColor: theme.colors.primary }}
                containerStyle={styles.addButton}
              />
            )}
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      />
      
      <FilterModal
  isVisible={isFilterVisible}
  onClose={() => setIsFilterVisible(false)}
  sortOption={sortOption}
  onSelectSort={setSortOption}
  minRating={minRatingFilter} // Asegúrate de tener este estado
  onRatingFilter={(rating) => {
    setMinRatingFilter(rating);
    filterMovies(search, sortOption, { minRating: rating });
  }}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  searchBarContainer: {
    flex: 1,
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
    borderRadius: 8,
    marginLeft: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
    textAlign: 'center',
  },
  addButton: {
    marginTop: 20,
    width: 200,
  },
});