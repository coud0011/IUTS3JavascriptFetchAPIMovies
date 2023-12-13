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

export function updateMoviesElt(page = 1) {
  // eslint-disable-next-line no-use-before-define
  setLoading();
  const movieDomList = document.querySelector("article.movies-list");
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.append("page", page);
  getAllMovies(urlSearchParams).then((movies) => {
    // eslint-disable-next-line no-use-before-define
    emptyElt(document.querySelector("article.movies-list"));
    movies.collection.forEach((movie) =>
      movieDomList.appendChild(createMovieElt(movie)),
    );
    // eslint-disable-next-line no-use-before-define
    updatePaginationElt(movies.pagination);
  });
}

export function createPaginationButtonElt(materialIcon, isDisabled, page) {
  const buttonElt = document.createElement("button");
  buttonElt.className = "button";
  buttonElt.disabled = isDisabled;
  buttonElt.type = "button";
  buttonElt.onclick = () => updateMoviesElt(page);
  buttonElt.innerHTML = `<span class="material-symbols-outlined">${materialIcon}</span>`;
  return buttonElt;
}

export function emptyElt(elt) {
  while (elt.hasChildNodes()) {
    elt.removeChild(elt.firstChild);
  }
}

export function updatePaginationElt(pagination) {
  if (pagination.last !== 1) {
    const paginationElt = document.querySelector("nav.pagination");
    let firstDisabled = false;
    if (pagination.current === 1) {
      firstDisabled = true;
    }
    let lastDisabled = false;
    if (pagination.current === pagination.last) {
      lastDisabled = true;
    }
    paginationElt.appendChild(
      createPaginationButtonElt("first_page", firstDisabled, 1),
    );
    paginationElt.appendChild(
      createPaginationButtonElt(
        "navigate_before",
        firstDisabled,
        pagination.current - 1,
      ),
    );
    const show = document.createElement("span");
    show.className = "pagination__info";
    show.innerHTML = `${pagination.current}/${pagination.last}`;
    paginationElt.appendChild(show);
    paginationElt.appendChild(
      createPaginationButtonElt(
        "navigate_next",
        lastDisabled,
        pagination.current + 1,
      ),
    );
    paginationElt.appendChild(
      createPaginationButtonElt("last_page", lastDisabled, pagination.last),
    );
  }
}

export function setLoading() {
  emptyElt(document.querySelector("nav.pagination"));
  document.querySelector("article.movies-list").innerHTML =
    `<article class="loading">Loading...</article>`;
}

export function appendSortToQuery(urlSearchParams) {
  const tri = document.querySelector("fieldset.sort");
  const tr = tri.checkVisibility();
  urlSearchParams.append(tr, "asc");
}
