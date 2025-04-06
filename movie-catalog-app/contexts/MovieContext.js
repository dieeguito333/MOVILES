import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  const STORAGE_KEY = `movieData_${userToken}`;

  const loadMovies = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedMovies) {
        const parsedMovies = JSON.parse(storedMovies);
        setMovies(parsedMovies);
        setFilteredMovies(parsedMovies);
      }
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMovies = async (moviesToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(moviesToSave));
    } catch (error) {
      console.error('Error saving movies:', error);
    }
  };

  const addMovie = async (movie) => {
    const newMovie = {
      ...movie,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      reviews: [],
    };
    const updatedMovies = [...movies, newMovie];
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
    return newMovie;
  };

  const updateMovie = async (id, updatedData) => {
    const updatedMovies = movies.map(movie => 
      movie.id === id ? { ...movie, ...updatedData } : movie
    );
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
  };

  const deleteMovie = async (id) => {
    const updatedMovies = movies.filter(movie => movie.id !== id);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
  };

  const addReview = async (movieId, review) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        return {
          ...movie,
          reviews: [...movie.reviews, {
            id: Date.now().toString(),
            text: review.text,
            rating: review.rating,
            createdAt: new Date().toISOString(),
          }],
        };
      }
      return movie;
    });
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
  };

  const filterMovies = (searchTerm, sortOption) => {
    let result = [...movies];
    
    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenar
    if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredMovies(result);
  };

  useEffect(() => {
    if (userToken) {
      loadMovies();
    } else {
      setMovies([]);
      setFilteredMovies([]);
    }
  }, [userToken]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        filteredMovies,
        isLoading,
        addMovie,
        updateMovie,
        deleteMovie,
        addReview,
        filterMovies,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};