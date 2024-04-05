import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './nba-team-detail.css';

const NbaTeamDetail = () => {
    const { team_code } = useParams();
    const [teamDetails, setTeamDetails] = useState(null);
    const [games, setGames] = useState([]);

    useEffect(() => {
        // fetch(`/api/nba-teams/${team_code}`) // Use the correct endpoint for fetching team details
        //     .then(response => response)
        //     .then(data => {
        //         setTeamDetails(data); // Assuming data contains the details of the selected NBA team

        //     })
        //     .catch(error => {
        //         console.error('Error fetching team details:', error);
        //         console.log(error);
        //     });

        const callDatabase = async () => {
            try {
                const call = await fetch (`http://localhost:5000/api/nba-teams/${team_code}`);
                const response = await call.json();
                console.log(response);
                setTeamDetails(response);
            }
            catch (error) {
                console.error("Error fetching data", error);
                throw error;
            }
        }
        callDatabase().catch(console.error);
    }, [team_code]);

    useEffect(() => {
        if (teamDetails) {
            const callNbaApi = async () => {
                try {
                    const headers = new Headers({
                        'X-RapidAPI-Key': '04a539da4fmshbeb70d75fafb072p1e6fd8jsn0f8c67fcb8eb',
                        'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
                    });
    
                    // const call = await fetch(`https://api-basketball.p.rapidapi.com/games?league=12&season=2023-2024&team=${teamDetails.Team_Number}`, {
                    //     method: "GET",
                    //     headers: headers
                    // });
                    const data = await call.json();
                    console.log(data);
                    const sortedGames = data.response.sort((a, b) => new Date(b.date) - new Date(a.date));
                    // Take the first 5 games
                    const mostRecentGames = sortedGames.slice(0, 10);
                    setGames(mostRecentGames);
                } catch (error) {
                    console.error("Error fetching data", error);
                    throw error;
                }
            }
    
            callNbaApi().catch(console.error);
        }
    }, [teamDetails]);
    

    return (
        <div>
            {teamDetails ? (
                <div>
                    <div className="team-name-container">
                        <h2>Team Details for {teamDetails.Team_Name}</h2> {/* Use Team_Name property */}
                    </div>
                    <div className="team-info-container">
                        <p>Established: {teamDetails.Established}</p> {/* Use Conference property */}
                        <p>City: {teamDetails.City}</p> {/* Use City property */}
                        <p>Conference: {teamDetails.Conference}</p> {/* Use Conference property */}
                        <p>Division: {teamDetails.Division}</p> {/* Use City property */}
                        <p>Arena: {teamDetails.Arena}</p> {/* Use Conference property */}
                        <p>Titles: {teamDetails['Number of Chamionships']}</p> {/* Use City property */}
                        <p>Arena Capacity: {teamDetails["Arena Capacity"]}</p> {/* Use City property */}
                        {/* Display other team details as needed */}
                    </div>
                    <div className="team-content-container">
                        <div>
                            <h3>Last 5 Games</h3>
                            {games
                                .filter(item => item.status.short !== "NS") // Filter out games with "Not Started" status
                                .slice(0, 5) // Take the first 5 games
                                .map((item, index) => (
                                    <div key={index}>
                                    <div>
                                        <img src={item.teams.home.logo} width={100} height={50} alt="Home Team Logo" />
                                        <h5>{item.scores.home.total}</h5>
                                        <h5>{item.teams.home.name}</h5>
                                    </div>
                                    <div>
                                        <img src={item.teams.away.logo} width={100} height={50} alt="Away Team Logo" />
                                        <h5>{item.scores.away.total}</h5>
                                        <h5>{item.teams.away.name}</h5>
                                    </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div>
                            <h3>Roster</h3>
                        </div>
                        <div>
                            <h3>Schedule and Results</h3>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default NbaTeamDetail;
