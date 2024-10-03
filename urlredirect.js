const express = require('express');
const app = express();

// Set up the static files to be served
app.use(express.static('public'));

// Route for index.html without .html extension
app.get('/index', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
