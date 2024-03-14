const express = require('express');
const app = express();

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

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
