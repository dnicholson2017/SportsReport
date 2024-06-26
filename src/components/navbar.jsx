import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './navbar.css'


let Navbar = () => {

    const [nbaTeams, setNbaTeams] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const callDatabase = async () => {
            try {
                const call = await fetch ('http://localhost:5000/api/nba-teams');
                const response = await call.json();
                console.log(response);
                setNbaTeams(response);
            }
            catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        }
        callDatabase().catch(console.error);

    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                <a className="navbar-brand" href={`/${username}`}>
                    SportsReport
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        NFL
                        </a>
                        <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                            Action
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Another action
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Something else here
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        NBA
                        </a>
                        <ul className="dropdown-menu">
                            <div>
                                <Link to={`/${username}/nba-players`}>
                                    Players
                                </Link>
                                <p>Home</p>
                                <Link to={`/${username}/box-score`}>
                                    <p>Scores</p>
                                </Link>
                                <p>Schedule</p>
                                <p>Stats</p>
                            </div>
                            <div className="nba-teams-grid">
                                {nbaTeams && nbaTeams.map((team, index) => (
                                    <li key={index}>
                                    <Link to={`/${username}/nba-team/${team.Team_Code}`} key={team.Team_Code}>
                                        <a className="dropdown-item" href="#">
                                        {team.Team_Name}
                                        </a>
                                    </Link>
                                    </li>
                                ))}
                            </div>

                        </ul>

                    </li>
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        NCAAM
                        </a>
                        <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                            Action
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Another action
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Something else here
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        NCAAW
                        </a>
                        <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                            Action
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Another action
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Something else here
                            </a>
                        </li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        >
                        NHL
                        </a>
                        <ul className="dropdown-menu">
                        <li>
                            <a className="dropdown-item" href="#">
                            Action
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Another action
                            </a>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                            Something else here
                            </a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;