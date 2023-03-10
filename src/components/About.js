import { useEffect } from "react";

const About = (props) => {
    useEffect(() => {
        props.setHero('About Hero');
    });
    return (
        <div>
            <h1>About</h1>
        </div>
    );
}

export default About;