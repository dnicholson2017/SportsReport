import React, { useState, useEffect } from "react";
import './CreateUser.css';

const CreateUser = () => {

    const [user, setUser] = useState({username:"", password:"", favorite_team:"" });
    const [nbaTeams, setNbaTeams] = useState(null);


    const handleChange = (event) => {
        const {name, value} = event.target;
        setUser( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

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

    const createUser = async (event) => {
        event.preventDefault();
        console.log(user);
    
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            
            if (!response.ok) {
                throw new Error('Failed to create user');
            }
    
            console.log('User created successfully');
            window.location = "/";
            // Redirect or perform any other action upon successful user creation
        } catch (error) {
            console.error('Error creating user:', error.message);
        }
    }
    

    return (
        <div className="sign-up-container">
            <h1>Sign-Up</h1>
            <form>

                <label for="username">Username</label> <br />
                <input type="text" id="username" name="username" onChange={handleChange} /><br />
                <br/>

                <label for="password">Password</label> <br />
                <input type="password" id="password" name="password" onChange={handleChange} /><br />
                <br/>

                <label for="favorite_team">Favorite Team</label> <br />
                <select name="favorite_team" onChange={handleChange}>
                    <option disabled selected>Select Team</option>
                    {nbaTeams && [...new Set(nbaTeams.map(team => team.Team_Code))].map((team, index) => (
                        <option key={index} value={team}>{team}</option>
                    ))}
                </select>

                <button type="button" onClick={createUser}>Sign-Up</button>

                
            </form>
        </div>
    )
}

export default CreateUser;