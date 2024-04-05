import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './nba-players.css';

const NbaPlayers = () => {
    const [players, setPlayers] = useState(null);
    const [filterResults, setFilterResults] = useState([]);
    const [searchInput, setSearchInput] = useState(2023);

    useEffect(() => {

        const callDatabase = async () => {
            try {
                const call = await fetch(`http://localhost:5000/api/players`);
                const response = await call.json();
                console.log(response);
                setPlayers(response);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        callDatabase().catch(console.error);

    }, [])

    // create method to filter by season
    const searchItem = (searchValue) => {
        // set search input to the value
        setSearchInput(searchValue);
        // condition to check if the value is NOT equal to an empty value
        if (searchValue !== "") {
            const filteredData = players.filter((player) => {
                return player.season.toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilterResults(filteredData)
        } else {
            setFilterResults([])
        }
    }

    // create method to filter by team
    const filterByTeam = (value) => {
        const filteredData = players.filter((player) => {
            return player.Team === value;
        });
        // If filterResults is not empty, apply filtering on it as well
        if (filterResults.length > 0) {
            const filteredByTeam = filterResults.filter((player) => {
                return player.Team === value;
            });
            setFilterResults(filteredByTeam);
        } else {
            setFilterResults(filteredData);
        }
    }

    return (
        <div>
            <div className="select-container">
                <select onChange={(e) => searchItem(e.target.value)}>
                    <option disabled selected>Select Season</option>
                    {players && [...new Set(players.map(player => player.season))].map((season, index) => (
                        <option key={index} value={season}>{season}</option>
                    ))}
                </select>
                <select onChange={(e) => filterByTeam(e.target.value)}>
                    <option disabled selected>Select Team</option>
                    {players && [...new Set(players.map(player => player.Team))].map((team, index) => (
                        <option key={index} value={team}>{team}</option>
                    ))}
                </select>
            </div>
            <div className="player-container">
                <div className="info-container">
                    <h3>Name</h3>
                    <ul>
                        {filterResults.length === 0 ? (
                            <div>No results found</div>
                        ) : (
                            filterResults.map((player, index) => (
                                <li key={index}>
                                    <Link     
                                        to={`/nba-players/${player.id}`}
                                        key={player.id}
                                    >
                                        <a>
                                            {player.Name}
                                        </a>
                                    
                                    </Link>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="info-container">
                    <h3>Team</h3>
                    <ul>
                        {filterResults.length === 0 ? (
                            <div>No results found</div>
                        ) : (
                            filterResults.map((player, index) => (
                                <li key={index}>{player.Team}</li>
                            ))
                        )}
                    </ul>
                </div>
                <div className="info-container">
                    <h3>Season</h3>
                    <ul>
                        {filterResults.length === 0 ? (
                            <div>No results found</div>
                        ) : (
                            filterResults.map((player, index) => (
                                <li key={index}>{player.season}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default NbaPlayers;
