const TMDB_IMG_URL = "https://image.tmdb.org/t/p/original/"
const TMDB_IMG_URL_W500 = "https://image.tmdb.org/t/p/w500/"

class MoviesPage {
    /**
     * 
     * @param movies list of received movies from an API call
     * @param page page number containing the movies for a specefic API call
     * @param isLastPage boolean - true if this is the last page
     */
    constructor(movies, page, isLastPage) {
        this.movies = movies;
        this.page = page;
        this.isLastPage = isLastPage;
    }
}

class TMDBApi {
    /**
     * 
     * @param apiKey The Movie DB api key
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * 
     * @param page result page
     * @returns a MoviesPage object containing popular movies and page info
     */
    getPopularMovies(page=1) {
        const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=en-US&page=${page}`;
        return new Promise((response, reject) => {
            this.fetchMoviesPage(URL)
                .then((data) => response(data));
        });
    }

    /**
     * 
     * @param query string query - a part of the movies names
     * @param page result page
     * @returns a MoviesPage object containing movies based on the search query and page info
     */
    searchMoviesByStringQuery(query, page=1) {
        const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&include_adult=false&query=${query}&page=${page}`;
        return new Promise((response, reject) => {
            this.fetchMoviesPage(searchURL)
                .then((data) => response(data));
        });
    }

    fetchMoviesPage(url) {
        return new Promise((response, reject) => {
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    response(new MoviesPage(data.results, data.page, data.page >= data.total_pages))
                })
        });
    }
}

module.exports = TMDBApi;

module.exports.TMDB_IMG_URL = TMDB_IMG_URL;
module.exports.TMDB_IMG_URL_W500 = TMDB_IMG_URL_W500;