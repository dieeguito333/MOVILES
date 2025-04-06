import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';
import { storeData, getData } from '../services/storageService';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const initialMovies = [
    // Saga completa de Harry Potter (8 películas)
    {
      id: '1',
      title: 'Harry Potter y la piedra filosofal',
      synopsis: 'El niño mago Harry Potter descubre su herencia mágica cuando ingresa al Colegio Hogwarts de Magia y Hechicería.',
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/M/MV5BNjQ3NWNlNmQtMTE5ZS00MDdmLTlkZjUtZTBlM2UxMGFiMTU3XkEyXkFqcGdeQXVyNjUwNzk3NDc@._V1_.jpg',
      createdAt: '2001-11-16',
      reviews: []
    },
    {
      id: '2',
      title: 'Harry Potter y la cámara secreta',
      synopsis: 'Harry regresa a Hogwarts para su segundo año, donde una misteriosa fuerza amenaza a los estudiantes.',
      rating: 4.3,
      image: 'https://m.media-amazon.com/images/M/MV5BMTcxODgwMDkxNV5BMl5BanBnXkFtZTYwMDk2MDg3._V1_FMjpg_UX1000_.jpg',
      createdAt: '2002-11-15',
      reviews: []
    },
    {
      id: '3',
      title: 'Harry Potter y el prisionero de Azkaban',
      synopsis: 'Harry descubre que un peligroso criminal ha escapado de la prisión de Azkaban y viene por él.',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BMTY4NTIwODg0N15BMl5BanBnXkFtZTcwOTc0MjEzMw@@._V1_.jpg',
      createdAt: '2004-06-04',
      reviews: []
    },
    {
      id: '4',
      title: 'Harry Potter y el cáliz de fuego',
      synopsis: 'Harry es seleccionado para el Torneo de los Tres Magos, compitiendo contra estudiantes mayores y experimentados.',
      rating: 4.2,
      image: 'https://m.media-amazon.com/images/M/MV5BMTI1NDMyMjExOF5BMl5BanBnXkFtZTcwOTc4MjQzMQ@@._V1_.jpg',
      createdAt: '2005-11-18',
      reviews: []
    },
    {
      id: '5',
      title: 'Harry Potter y la Orden del Fénix',
      synopsis: 'Harry forma un grupo secreto para enseñar magia defensiva mientras el Ministerio de Magia niega el regreso de Voldemort.',
      rating: 4.1,
      image: 'https://m.media-amazon.com/images/M/MV5BOTA3MmRmZDgtOWU1Ny00ZDk5LWFkZGYtZmVjYTY0YjhiYWIwXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_.jpg',
      createdAt: '2007-07-11',
      reviews: []
    },
    {
      id: '6',
      title: 'Harry Potter y el misterio del príncipe',
      synopsis: 'Harry descubre un libro que perteneció al "Príncipe Mestizo" mientras Dumbledore le prepara para la batalla final.',
      rating: 4.4,
      image: 'https://m.media-amazon.com/images/M/MV5BNzU3NDg4NTAyNV5BMl5BanBnXkFtZTcwOTg2ODg1Mg@@._V1_.jpg',
      createdAt: '2009-07-15',
      reviews: []
    },
    {
      id: '7',
      title: 'Harry Potter y las reliquias de la muerte - Parte 1',
      synopsis: 'Harry, Ron y Hermione emprenden una peligrosa misión para encontrar y destruir los horrocruxes de Voldemort.',
      rating: 4.3,
      image: 'https://m.media-amazon.com/images/M/MV5BMTQ2OTE1Mjk0N15BMl5BanBnXkFtZTcwODE3MDAwNA@@._V1_.jpg',
      createdAt: '2010-11-19',
      reviews: []
    },
    {
      id: '8',
      title: 'Harry Potter y las reliquias de la muerte - Parte 2',
      synopsis: 'La batalla final entre las fuerzas del bien y del mal en el mundo mágico llega a su épico clímax.',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg',
      createdAt: '2011-07-15',
      reviews: []
    },
    
    // Otras 12 películas populares
    {
      id: '9',
      title: 'El Señor de los Anillos: La Comunidad del Anillo',
      synopsis: 'Un hobbit recibe un anillo poderoso y debe emprender un viaje para destruirlo en el Monte del Destino.',
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
      createdAt: '2001-12-19',
      reviews: []
    },
    {
      id: '10',
      title: 'El Padrino',
      synopsis: 'La historia de la familia Corleone, una de las dinastías criminales más poderosas de Nueva York.',
      rating: 4.9,
      image: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      createdAt: '1972-03-24',
      reviews: []
    },
    {
      id: '11',
      title: 'Pulp Fiction',
      synopsis: 'Las vidas de dos mafiosos, un boxeador, la esposa de un gánster y un par de bandidos se entrelazan.',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      createdAt: '1994-10-14',
      reviews: []
    },
    {
      id: '12',
      title: 'El Caballero de la Noche',
      synopsis: 'Batman se enfrenta al Joker, un criminal psicótico que sumerge a Ciudad Gótica en el caos.',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
      createdAt: '2008-07-18',
      reviews: []
    },
    {
      id: '13',
      title: 'Titanic',
      synopsis: 'Una joven aristócrata y un artista pobre se enamoran a bordo del lujoso pero desafortunado RMS Titanic.',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
      createdAt: '1997-12-19',
      reviews: []
    },
    {
      id: '14',
      title: 'Star Wars: Episodio IV - Una nueva esperanza',
      synopsis: 'Luke Skywalker se une a un caballero jedi, un piloto y dos droides para salvar a la princesa Leia.',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg',
      createdAt: '1977-05-25',
      reviews: []
    },
    {
      id: '15',
      title: 'Matrix',
      synopsis: 'Un hacker descubre la impactante verdad sobre la realidad y su papel en la guerra contra sus controladores.',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      createdAt: '1999-03-31',
      reviews: []
    },
    {
      id: '16',
      title: 'Forrest Gump',
      synopsis: 'La vida de un hombre con un bajo coeficiente intelectual que logra cosas extraordinarias en la historia de EE.UU.',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      createdAt: '1994-07-06',
      reviews: []
    },
    {
      id: '17',
      title: 'El Rey León',
      synopsis: 'Un joven león es exiliado de su reino y debe aprender a crecer para reclamar su lugar como rey.',
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_.jpg',
      createdAt: '1994-06-24',
      reviews: []
    },
    {
      id: '18',
      title: 'Jurassic Park',
      synopsis: 'Un millonario crea un parque temático con dinosaurios clonados, pero la seguridad falla catastróficamente.',
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_.jpg',
      createdAt: '1993-06-11',
      reviews: []
    },
    {
      id: '19',
      title: 'Avengers: Endgame',
      synopsis: 'Los Vengadores restantes deben encontrar una manera de recuperar a sus aliados para una batalla final contra Thanos.',
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      createdAt: '2019-04-26',
      reviews: []
    },
    {
      id: '20',
      title: 'El Resplandor',
      synopsis: 'Un escritor acepta un trabajo como cuidador de un hotel aislado durante el invierno, donde la locura lo acecha.',
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      createdAt: '1980-05-23',
      reviews: []
    }
  ];
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userToken } = useContext(AuthContext);

  const STORAGE_KEY = `movieData_${userToken}`;

  const loadMovies = async () => {
    try {
      let moviesToLoad = initialMovies;
      const storedMovies = await getData(STORAGE_KEY);
      
      if (storedMovies && storedMovies.length > 0) {
        moviesToLoad = storedMovies;
      } else {
        await storeData(STORAGE_KEY, initialMovies);
      }
      
      setMovies(moviesToLoad);
      setFilteredMovies(moviesToLoad);
    } catch (error) {
      console.error('Error loading movies:', error);
      setMovies(initialMovies);
      setFilteredMovies(initialMovies);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMovies = async (moviesToSave) => {
    try {
      await storeData(STORAGE_KEY, moviesToSave);
    } catch (error) {
      console.error('Error saving movies:', error);
    }
  };

  const addMovie = async (movie) => {
    try {
      const newMovie = {
        ...movie,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        reviews: [],
        rating: movie.rating || 0,
      };
      
      const updatedMovies = [...movies, newMovie];
      setMovies(updatedMovies);
      setFilteredMovies(updatedMovies);
      await saveMovies(updatedMovies);
      return newMovie; 
    } catch (error) {
      console.error('Error adding movie:', error);
      throw error;
    }
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
  
  const updateReview = async (movieId, reviewId, updatedReview) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        return {
          ...movie,
          reviews: movie.reviews.map(review => {
            if (review.id === reviewId) {
              return {
                ...review,
                text: updatedReview.text,
                rating: updatedReview.rating,
                updatedAt: new Date().toISOString(),
              };
            }
            return review;
          }),
        };
      }
      return movie;
    });
    
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
  };
  
  const deleteReview = async (movieId, reviewId) => {
    const updatedMovies = movies.map(movie => {
      if (movie.id === movieId) {
        return {
          ...movie,
          reviews: movie.reviews.filter(review => review.id !== reviewId),
        };
      }
      return movie;
    });
    
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    await saveMovies(updatedMovies);
  };

  const filterMovies = (searchTerm, sortOption, filterOptions = {}) => {
    let result = [...movies];
    
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.synopsis.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterOptions.minRating) {
      result = result.filter(movie => movie.rating >= filterOptions.minRating);
    }
    
    if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'newest') {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
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
        updateReview,
        deleteReview,
        filterMovies,
        loadMovies
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};