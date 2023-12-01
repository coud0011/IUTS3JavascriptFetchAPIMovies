import { getAllMovies, posterUrl } from "./movies-api";

export function createMovieElt(movieData) {
  const movieElt = document.createElement("article");
  movieElt.className = "movie-item";
  movieElt.innerHTML = `<img src="${posterUrl(
    movieData.poster,
    "medium",
  )}" alt="poster of '${movieData.title}'" class="movie-item__poster">
<div class="movie-item__info"><div class="movie-item__title">${
    movieData.title
  }</div></div>`;
  return movieElt;
}

export function updateMoviesElt() {
  const movieDomList = document.querySelector("article.movies-list");
  getAllMovies().then((movies) =>
    movies.forEach((movie) => movieDomList.appendChild(createMovieElt(movie))),
  );
}
