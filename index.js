// Create an express server and render the build index html file
const express = require('express');
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
