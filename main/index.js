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
    const response = await axios.post('https://v2.schoolcheats.net/edpuzzle/assignments', {
      token,
      classId
    }, {
      headers: {
        'Cookie': '_ga=GA1.1.2082089131.1711240477; _gcl_au=1.1.655362806.1711240477; token=' + encodeURIComponent(token) + '; __gads=ID=6a949120f3b84579:T=1711240478:RT=1711902748:S=ALNI_MbHZhKxGEiLcuJE-VWsy-z9hZXkmg; __gpi=UID=00000dd516633973:T=1711240478:RT=1711902748:S=ALNI_MakCljffK6VdSLlCkzPk8hBZmP9LQ; __eoi=ID=33320d6f248e4ae9:T=1711240478:RT=1711902748:S=AA-AfjYf1uKwpbMgET6R482nyN0s; FCNEC=%5B%5B%22AKsRol-YzDOYCuKrTEk599iWGJlG8JuJCfJfWdiDuBtZ-4cxRN4CdU_pnSYrXG_gLZLdjViiULS5Kyd_Z34XLtW5JF9xUZFy48vCeSq2W1XRHY9FFW6PTOZ-MGOGd6CJ2SokrSLCd4DOVJugYJKJrvrxdHTJnoSmdQ%3D%3D%22%5D%2Cnull%2C%5B%5B2%2C%22%5B%5B%5B%5B1%2Cnull%2C%5B1711839620%2C30988000%5D%2C10%5D%5D%5D%2C%5Bnull%2C26%2C%5B1711240481%2C469855000%5D%5D%5D%22%5D%5D%5D; _ga_K836MS1B0K=GS1.1.1711902746.6.1.1711902753.53.0.0'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
