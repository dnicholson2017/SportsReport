import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NbaTeamDetail = () => {
    const { team_code } = useParams();
    const [teamDetails, setTeamDetails] = useState(null);

    useEffect(() => {
        fetch(`/api/nba-teams/${team_code}`) // Use the correct endpoint for fetching team details
            .then(response => response.json())
            .then(data => {
                setTeamDetails(data); // Assuming data contains the details of the selected NBA team
            })
            .catch(error => {
                console.error('Error fetching team details:', error);
            });
    }, [team_code]);

    return (
        <div>
            {teamDetails ? (
                <div>
                    <h2>Team Details for {teamDetails.Team_Name}</h2> {/* Use Team_Name property */}
                    <p>City: {teamDetails.City}</p> {/* Use City property */}
                    <p>Conference: {teamDetails.Conference}</p> {/* Use Conference property */}
                    {/* Display other team details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default NbaTeamDetail;
