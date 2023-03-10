import { useEffect } from "react";

const SearchView = (props) => {
    
    useEffect(() => {
        props.setHero('Search Hero');
    });

    return (
        <div>
            <h1>Search</h1>
        </div>
    );
}

export default SearchView;