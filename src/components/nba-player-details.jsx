import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './nba-player-details.css';

const NbaPlayerDetail = () => {

    const { player_id } = useParams();
    const [playerStats, setPlayerStats] = useState([]);

    useEffect(() => {
        const callDatabase = async () => {
            try {
                const call = await fetch(`http://localhost:5000/api/nba-player/${player_id}`);
                const response = await call.json();
                setPlayerStats(response)
                console.log(response);
            }
            catch {
                console.error('Error fetching player stat data', error);
            }
        }

        callDatabase().catch(console.error);
    }, [])

    return (
        <div>
            <div className="player-name-container">
                {playerStats.length > 0 && (
                    <h1>{playerStats[0]['Player Name']}</h1>
                )}
            </div>
            <div className="player-detail-container">
                <div>
                    <h3>Season </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.season}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>FG </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_FG}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>3PA </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_3PA}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>FT </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_FT}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>ORB </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_ORB}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>DRB </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_DRB}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>TRB </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_TRB}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>AST </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_AST}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>STL </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_STL}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>BLK </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_BLK}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>TOV </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_TOV}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>PF </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_PF}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3>PTS </h3>
                    <ul>
                        {playerStats && playerStats.map((season, index) => (
                            <li key={index}>{season.total_PTS}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NbaPlayerDetail;