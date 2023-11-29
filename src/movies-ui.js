export function createMovieElt(movieData){
  let movieElt=document.createElement("article");
  movieElt.className="movie-item";
  movieElt.innerHTML=`<div class="movie-item__info"><div class="movie-item__title">${movieData.title}</div></div>`;
  return movieElt;
}