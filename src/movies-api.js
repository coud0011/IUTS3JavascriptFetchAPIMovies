export const API_URL = "http://movies-api";
export const IMAGE_SIZES = ["original", "xsmall", "small", "medium"];

export function getAllMovies() {
  return fetch(`${API_URL}/movies`).then((response) => response.json());
}

export function posterUrl(imagePath, size = "original") {
  /*
With imagePath the path given by API,
and the size can be : « xsmall », « small », « medium » or « original » : last for default
 */
  return `${API_URL}${imagePath}/${size}`;
}
