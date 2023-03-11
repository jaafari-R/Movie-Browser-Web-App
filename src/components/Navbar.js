import { useNavigate } from "react-router-dom";

const Navbar = (props) =>
{
    const navigate = useNavigate();

    const searchWrite = (e) => {
        props.setSearch(e.target.value);
        navigate("/search");    
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Movies Browser</a>
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/about">About</a>
                    </li>
                </ul>
                <form className="d-flex">
                    <input className="form-control me-2" onChange={(e) => searchWrite(e)} type="search" placeholder="Search" aria-label="Search" value={props.searchText}/>
                    {/* <button className="btn btn-outline-success" type="submit">Search</button> */}
                </form>
            </div>
        </nav>
    );
}

export default Navbar;