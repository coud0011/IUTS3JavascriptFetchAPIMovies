export const API_URL = "http://movies-api";
export const IMAGE_SIZES = ["original", "xsmall", "small", "medium"];

export function getAllMovies(urlSearchParams, abortController) {
  const { signal } = abortController;
  if (urlSearchParams instanceof URLSearchParams) {
    return fetch(`${API_URL}/movies?${urlSearchParams}`, { signal }).then(
      (response) =>
        // eslint-disable-next-line no-use-before-define
        extractCollectionAndPagination(response),
    );
    // eslint-disable-next-line no-console
  }
  // eslint-disable-next-line prefer-promise-reject-errors
  return Promise.reject("Parameter is not an URLSearchParams");
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
