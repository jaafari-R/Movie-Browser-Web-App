

class SearchMovie {
    /**
     * 
     * @param movies list of received movies from a search operation
     * @param page page of movies / using pagination
     * @param pages_left boolean - true if this is the last page
     */
    constructor(movies, page, pages_left) {
        this.movies = movies;
        this.page = page;
        this.pages_left = pages_left;
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
     * @param query string query - a part of the movies names
     * @param page result page
     * @returns a SearchMovie object containing movies and page info
     */
    searchMoviesByStringQuery(query, page=1) {
        const searchURL = `https://api.themoviedb.org/3/search/multi?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${query}&page=${page}`
        return new Promise((response, reject) => {
            fetch(searchURL)
                .then((res) => res.json())
                .then((data) => {
                    const reso = new SearchMovie(data.results, data.page, data.page < data.total_pages) 
                    console.log(reso)
                    response(new SearchMovie(data.results, data.page, data.page < data.total_pages))
                })
        })
    }
}

module.exports = TMDBApi