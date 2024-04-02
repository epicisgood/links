const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
const mainPath = path.join(__dirname, '..', 'main');
app.options('*', cors());

app.use(express.static(mainPath));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(mainPath, 'index.html'));
});

app.get('/answers', (req, res) => {
  res.sendFile(path.join(mainPath, 'edpuzzle.html'));
});

app.post('/edpuzzle', async (req, res) => {
  try {
    if (!req.body || !req.body.token || !req.body.classId) {
      throw new Error('Token and classId are required.');
    }
    const { token, classId } = req.body;
    const cookie = req.headers.cookie; 
    const CurrentEpoochTime = Math.floor(Date.now() / 1000) % 10000000000; 
    const response = await axios.post('https://v2.schoolcheats.net/edpuzzle/assignments', {
      token,
      classId
    }, {
      headers: {
        'cookie': cookie
        
      }
    });
    console.log(CurrentEpoochTime)
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
