
const Hero = (props) => {
    return (
        <div className="bg-dark text-light">
            <div className="fluid-container p-5 mt-1">
                <h1>{props.heroText}</h1>
            </div>
        </div>
    );
}

export default Hero;