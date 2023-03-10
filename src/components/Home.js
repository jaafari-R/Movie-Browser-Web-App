import { useEffect } from "react";

const Home = (props) => {
    useEffect(() => {
        props.setHero('Home Hero');
    });

    return (
        <div>
            <h1>Home</h1>
        </div>
    );
}

export default Home;