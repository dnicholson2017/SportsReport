import React, { useEffect, useState } from "react";

const NbaPlayerDetail = () => {
    const [players, setPlayers] = useState(null)

    useEffect(() => {

        const callDatabase =  async() => {
            try {
                const call = await fetch(`http://localhost:5000/api/players`);
                const response = await call.json();
                console.log(response);
                // Limiting the number of players to process
                // const limitedPlayers = response.slice(0, 1000);
                setPlayers(response);
            }

            catch {
                console.error('Error fetching data', error);
                throw error
            }
        }

        callDatabase().catch(console.error);

    }, [])

    return (
        <div>
            
            <div>
                <h3>Name</h3>
                <ul>
                    {players && players.map((player, index) => (
                        <li key={index}>{player.Name}</li>
                    ))}
                </ul>
            </div>
        </div>
        
    )

}

export default NbaPlayerDetail;