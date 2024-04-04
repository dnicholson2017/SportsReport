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

app.get(`/api/box-scores`, (req, res) => {
  // write a query to the database
  const query = 
              `SELECT 
                h.Team_Code AS home_team_code, 
                h.date AS home_team_date,
                h.total AS home_total, 
                h.home AS home_home, 
                h.season AS home_season, 
                h.Game_ID AS home_game_id,
                a.Team_Code AS away_team_code, 
                a.date AS away_team_date,
                a.total AS away_total, 
                a.home AS away_home, 
                a.season AS away_season, 
                a.Game_ID AS away_game_id
            FROM 
              nbagame_schema.home_team_basic_stats AS h
            JOIN 
              nbagame_schema.away_team_basic_stats AS a
            ON 
              h.Game_ID = a.Game_ID;
            `
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
  const query = `
                SELECT \`Player Name\`, season, 
                      SUM(FG) AS total_FG, 
                      SUM(3PA) AS total_3PA, 
                      SUM(FT) AS total_FT,
                      SUM(ORB) AS total_ORB,
                      SUM(DRB) AS total_DRB,
                      SUM(TRB) AS total_TRB,
                      SUM(AST) AS total_AST,
                      SUM(STL) AS total_STL,
                      SUM(BLK) AS total_BLK,
                      SUM(TOV) AS total_TOV,
                      SUM(PF) AS total_PF,
                      SUM(PTS) AS total_PTS
                FROM (
                    SELECT FG, 3PA, FT, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS, season, \`Player Name\`
                    FROM nbagame_schema.player_home_game_basic_stats
                    WHERE id = ?
                    UNION ALL
                    SELECT FG, 3PA, FT, ORB, DRB, TRB, AST, STL, BLK, TOV, PF, PTS, season, \`Player Name\`
                    FROM nbagame_schema.player_away_game_basic_stats
                    WHERE id = ?
                ) AS combined_stats
                GROUP BY \`Player Name\`, season;
              `;
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
        // Return the details of the player stats across seasons
        // unlike the other querys we want the entire response, 
        // we don't use results[0] to get just the first object in results
        res.json(results);
      }
    }
  });
});


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
