const express = require('express');
const app = express();
const cors = require('cors');

// Enable CORS middleware
app.use(cors());

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Define API endpoint to fetch NBA player data
// request (req) and response (res)
app.get('/api/players', (req, res) => {
  // write desired query
  const query = 'SELECT * FROM nbagame_schema.players GROUP BY Name, season;';

  // make connection to the database to make the query
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching player data', error);
      res.status(500).json({error: 'Internal server error'});
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to fetch NBA team names and team_code
app.get('/api/nba-teams', (req, res) => {
  const query = 'SELECT Team_Name, Team_Code FROM nbagame_schema.`nba teams`;';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching NBA teams:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Define API endpoint to fetch NBA team details based on team_code
app.get('/api/nba-teams/:team_code', (req, res) => {
  const teamCode = req.params.team_code;
  const query = `SELECT * FROM nbagame_schema.\`nba teams\` WHERE Team_Code = ?;`;

  connection.query(query, [teamCode], (error, results) => {
    if (error) {
      console.error('Error fetching NBA team details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        // If no team found for the provided team_code
        res.status(404).json({ error: 'Team not found' });
      } else {
        // Return the details of the team
        res.json(results[0]);
      }
    }
  });
});

// Define api endpoint to fetch stats of a player
app.get('/api/nba-player/:player_id', (req, res) => {
  // create a variable for the param from the route path
  const playerID = req.params.player_id;
  // create a query
  const query = `SELECT season, SUM(FG) AS total_FG, SUM(3PA) AS total_3PA, SUM(FT) AS total_FT
                FROM (
                    SELECT FG, 3PA, FT, season
                    FROM nbagame_schema.player_home_game_basic_stats
                    WHERE id = ?
                    UNION ALL
                    SELECT FG, 3PA, FT, season
                    FROM nbagame_schema.player_away_game_basic_stats
                    WHERE id = ?
                ) AS combined_stats
                GROUP BY season;
                `
  // playerID, playerID is passed twice because it's needed in both home and away tables
  connection.query(query, [playerID, playerID], (error, results) => {
    if (error) {
      console.error('Error fetching NBA player details:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.length === 0) {
        // If no team found for the provided team_code
        res.status(404).json({ error: 'Player not found' });
      } else {
        // Return the details of the team
        res.json(results[0]);
      }
    }
  });
})

// // Define API endpoint to fetch NBA team names
// app.get('/api/nba-teams', (req, res) => {
//   const query = 'SELECT Team_Name FROM nbagame_schema.`nba teams`;';

//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching NBA teams:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Dynamically create server endpoint for selected team
// app.get('/api/nba-teams/:team_code', (req, res) => {
//   const teamCode = req.params.team_code;
//   const query = `SELECT * FROM nbagame_schema.\`nba teams\` WHERE Team_Code = ?;`;
//   // Execute the query and respond with the team details or 404 if not found
  
//   connection.query(query, (error, results) => {
//     if (error) {
//       console.error('Error fetching NBA teams:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'database-1.c5yq8g2qqurj.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'sqlProject',
  database: 'nbagame_schema'
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});
