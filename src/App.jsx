/* eslint-disable react/prop-types */
import { useState } from "react";
import "./index.css";

const App = () => {
  const [movies, setMovies] = useState([]);

  const handleAddMovies = (movie) => {
    setMovies((movies) => [...movies, movie]);
  };

  const deleteMovie = (id) => {
    setMovies((movies) => movies.filter((movie) => movie.id !== id));
  };

  const clearMovieList = () => {
    setMovies([]);
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="form-container">
        <FormInput onAddMovies={handleAddMovies} />
        <Button onClick={clearMovieList}>Clear Movie List</Button>
      </div>
      <MovieList movies={movies} onDeleteMovie={deleteMovie} />
    </div>
  );
};

export default App;

function Button({ children, remove, onClick }) {
  return (
    <button type="submit" className={remove} onClick={onClick}>
      {children}
    </button>
  );
}

function FormInput({ onAddMovies }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    if (!name || !image) return;
    e.preventDefault();
    const newMovie = {
      id: crypto.randomUUID(),
      name,
      image,
    };
    onAddMovies(newMovie);
    setName("");
    setImage("");
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            className="img"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <input
            type="text"
            className="name"
            placeholder="Enter movie name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <Button>Add Movie</Button>
      </form>
    </>
  );
}

function MovieList({ movies, onDeleteMovie }) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          movie={movie}
          onDeleteMovie={() => onDeleteMovie(movie.id)}
        />
      ))}
    </div>
  );
}

function Movie({ movie, onDeleteMovie }) {
  return (
    <div className="movie-item">
      <img src={movie.image} alt={movie.name} />
      <p>{movie.name}</p>
      <Button remove="remove" onClick={onDeleteMovie}>
        Remove
      </Button>
    </div>
  );
}
