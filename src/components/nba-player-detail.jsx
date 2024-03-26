import React, { useEffect, useState } from "react";
import './nba-player-detail.css';

const NbaPlayerDetail = () => {
    const [players, setPlayers] = useState(null);
    const [filterResults, setFilterResults] = useState([]);
    const [searchInput, setSearchInput] = useState(2023);

    useEffect(() => {

        const callDatabase =  async() => {
            try {
                const call = await fetch(`http://localhost:5000/api/players`);
                const response = await call.json();
                console.log(response);
                setPlayers(response);

                // Extract unique seasons from players
                const seasons = [...new Set(response.map(player => player.season))];
                // Set the initial search input to the first season
                setSearchInput(seasons[0]);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        }

        callDatabase().catch(console.error);

    }, [])

    // create method to filter
    const searchItem = (searchValue) => {
        // set search input to the value
        setSearchInput(searchValue)
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

    return (
        <div className="parent-container">
            <select onChange={(e) => searchItem(e.target.value)}>
                <option disabled selected>Select Season</option>
                {players && [...new Set(players.map(player => player.season))].map((season, index) => (
                    <option key={index} value={season}>{season}</option>
                ))}
            </select>
            <select>
                <option>
                    Team
                </option>
            </select>
            <div className="player-container">
                <div className="info-container">
                    <h3>Name</h3>
                    <ul>
                        {filterResults.length === 0 ? (
                            <div>No results found</div>
                        ) : (
                            filterResults.map((player, index) => (
                                <li key={index}>{player.Name}</li>
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

export default NbaPlayerDetail;
