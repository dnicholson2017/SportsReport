import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const NbaTeamDetail = () => {
    const { team_code } = useParams();
    const [teamDetails, setTeamDetails] = useState(null);

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

    return (
        <div>
            {teamDetails ? (
                <div>
                    <h2>Team Details for {teamDetails.Team_Name}</h2> {/* Use Team_Name property */}
                    <p>Established: {teamDetails.Established}</p> {/* Use Conference property */}
                    <p>City: {teamDetails.City}</p> {/* Use City property */}
                    <p>Conference: {teamDetails.Conference}</p> {/* Use Conference property */}
                    <p>Division: {teamDetails.Division}</p> {/* Use City property */}
                    <p>Arena: {teamDetails.Arena}</p> {/* Use Conference property */}
                    <p>Titles: {teamDetails['Number of Chamionships']}</p> {/* Use City property */}
                    <p>Arena Capacity: {teamDetails["Arena Capacity"]}</p> {/* Use City property */}
                    {/* Display other team details as needed */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default NbaTeamDetail;
