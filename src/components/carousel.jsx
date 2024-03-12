import React, { useState } from "react";
import axios from "axios";

const Carousel = () => {
  const [gameData, setGameData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
  
    try {
      const response = await axios.get("https://api-basketball.p.rapidapi.com/games", {
        params: { date: '2019-11-26' },
        headers: {
          'X-RapidAPI-Key': '04a539da4fmshbeb70d75fafb072p1e6fd8jsn0f8c67fcb8eb',
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com'
        }
      });
  
      console.log(response.data); // Log the entire API response
  
      // Update the gameData state with the first 8 results of the API data
      setGameData(response.data.slice(0, 8));
    } catch (error) {
      setError(error.message);
    }
  
    setIsLoading(false);
  };
  

  return (
    <div>
      <div className="wrapper">
        {gameData.map((game, index) => (
          <div className="item" key={index}>
            {/* Display game information here */}
            <p>Date: {game.date}</p>
            <p>Home Team: {game.home_team}</p>
            <p>Visitor Team: {game.visitor_team}</p>
            {/* Add more game information as needed */}
          </div>
        ))}
      </div>

      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? "Loading..." : "Fetch Data"}
      </button>

      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default Carousel;
