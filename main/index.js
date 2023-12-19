const express = require('express');
const path = require('path');
const app = express();

// Serve all files from the 'main' directory at the root
app.use(express.static('main'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

// New route for '/dev'
app.get('/dev', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dev', 'dev.html')); // Access '../dev/dev.html' instead of 'dev/dev.html'
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});