export const API_URL = "http://movies-api";
export const IMAGE_SIZES = ["original", "xsmall", "small", "medium"];

export function getAllMovies(page = 1) {
  return fetch(`${API_URL}/movies?page=${page}`).then((response) =>
    // eslint-disable-next-line no-use-before-define
    extractCollectionAndPagination(response),
  );
}

export function posterUrl(imagePath, size = "original") {
  /*
With imagePath the path given by API,
and the size can be : « xsmall », « small », « medium » or « original » : last for default
 */
  return `${API_URL}${imagePath}/${size}`;
}

export function extractPaginationFromHeaders(response) {
  return {
    current: parseInt(response.headers.get("Pagination-Current-Page"), 10),
    last: parseInt(response.headers.get("Pagination-Last-Page"), 10),
  };
}

export function extractCollectionAndPagination(response) {
  const pagination = extractPaginationFromHeaders(response);
  return response.json().then((collection) => ({
    pagination,
    collection,
  }));
}
