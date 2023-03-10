import { useEffect, useState } from "react";

const IMG_URL = require('../TMDB.js').TMDB_IMG_URL_W500;

const SearchView = (props) => {

    const [moviesCards, setMoviesCards] = useState([]);

    useEffect(() => {
        props.setHero(`Looking for ${props.searchText}`);
    });

    useEffect(() => {
        loadMoviesCards();
    }, [props.movies, props.page, props.isLastPage]);

    const loadMoviesCards = () => {
        setMoviesCards(props.movies.map((movie, i) => createCard(movie, i)));
    }

    function createCard(movie, key) {
        console.log(movie)
        console.log(movie.name)

        const title = movie.title || movie.name;
        const description = movie.overview;
        const img_url = IMG_URL + movie.backdrop_path;

        return (
        <div className="card col-lg-4" key={key}>
            <img className="card-img-top" src={img_url} alt="" />
            <div className="card-body">
                <h3>{title}</h3>
                <p className="card-text">{description}</p>
            </div>
        </div>
        );
        {/* <h1 key={key}>{movie.title}</h1> */}
    }

    return (
        <div>
            <div className="row">
                {moviesCards}
            </div>
            {!props.isLastPage && 
                <button className="form-control">Load More <br/><img width="15vh" src="/down-arrow.png" alt="" /></button>}
        </div>
    );
}

export default SearchView;