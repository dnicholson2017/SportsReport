import React, { useEffect, useState } from "react";
import './boxscore.css';


const BoxScores = () => {

    const [boxscore, setBoxscore] = useState([]);
    const [filterResults, setFilterResults] = useState([]);
    const [searchInput, setSearchInput] = useState(2023);

    useEffect(() => {
        const callDatabase = async () => {
            try {
                const call = await fetch (`http://localhost:5000/api/box-scores`);
                const response = await call.json()
                console.log(response)
                setBoxscore(response)
            }
            catch (error) {
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
            const filteredData = boxscore.filter((game) => {
                // Ensure home_season is treated as a string before calling toLowerCase()
                return game.home_season.toString().toLowerCase().includes(searchValue.toLowerCase());
            });
            setFilterResults(filteredData);
        } else {
            setFilterResults([]);
        }
    }


    // create method to filter by month
    const filterByMonth = (value) => {
        const filteredData = boxscore.filter((game) => {
            return game.home_team_date === value;
        });
        // If filterResults is not empty, apply filtering on it as well
        if (filterResults.length > 0) {
            const filteredByMonth = filterResults.filter((game) => {
                return new Date(game.home_team_date).toLocaleString('en-US', { month: 'long' }) === value;
            });
            setFilterResults(filteredByMonth);
        } else {
            setFilterResults(filteredData);
        }
    }

        // create method to filter by team
        const filterByTeam = (value) => {
            const filteredData = boxscore.filter((game) => {
                return game.home_team_date === value;
            });
            // If filterResults is not empty, apply filtering on it as well
            if (filterResults.length > 0) {
                const filteredByTeam = filterResults.filter((game) => {
                    // Ensure home_season is treated as a string before calling toLowerCase()
                    return game.home_team_code === value || game.away_team_code === value;   
                });
                setFilterResults(filteredByTeam);
            } else {
                setFilterResults(filteredData);
            }
        }

    return (
        <div>
            <div className="select-container">
                <select  onChange={(e) => searchItem(e.target.value)}>
                    <option disabled selected>Select Season</option>
                    {boxscore && [...new Set(boxscore.map(game => game.home_season))].map((season, index) => (
                        <option key={index} value={season}> {season}</option>
                    ))}
                </select>
                <select  onChange={(e) => filterByMonth (e.target.value)}>
                    <option disabled selected>Select Month</option>
                    {boxscore && [...new Set(boxscore.map(game => new Date(game.home_team_date).toLocaleString('en-US', { month: 'long' })))].map((date, index) => (
                        <option key={index} value={date}> {date}</option>
                    ))}
                </select>
                <select onChange={(e) => filterByTeam(e.target.value)}>
                    <option disabled selected>Select Team</option>
                    {boxscore && [...new Set(boxscore.map(game => game.home_team_code))].map((team, index) => (
                        <option key={index} value={team}> {team}</option>
                    ))}
                </select>
            </div>
            <div className="content-component">
                <div>
                    <h3>Date</h3>
                    {filterResults && filterResults.map((game, index) => (
                        <ul key={index}>
                            <li>{game.home_team_date}</li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h3>Away Team</h3>
                    {filterResults && filterResults.map((game, index) => (
                        <ul key={index}>
                            <li>{game.away_team_code}</li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h3>Away Score</h3>
                    {filterResults && filterResults.map((game, index) => (
                        <ul key={index}>
                            <li>{game.away_total}</li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h3>Home Team</h3>
                    {filterResults && filterResults.map((game, index) => (
                        <ul key={index}>
                            <li>{game.home_team_code}</li>
                        </ul>
                    ))}
                </div>
                <div>
                    <h3>Home Score</h3>
                    {filterResults && filterResults.map((game, index) => (
                        <ul key={index}>
                            <li>{game.home_total}</li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BoxScores;