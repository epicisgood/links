const express = require('express');
const app = express();

app.use(express.static('main')); // Serves all files from the 'public' directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/main/index.html'); // Adjust the path if necessary
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



