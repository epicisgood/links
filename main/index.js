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
    const encodedtoken = encodeURIComponent(token)
    const response = await axios.post('https://v2.schoolcheats.net/edpuzzle/assignments', {
      token,
      classId
    }, {
      headers: {
        'cookie': `_gcl_au=1.1.680293524.1711921265; _ga=GA1.1.278429596.1711921265; __gads=ID=6a949120f3b84579:T=1711240478:RT=1712018952:S=ALNI_MbHZhKxGEiLcuJE-VWsy-z9hZXkmg; __gpi=UID=00000dd516633973:T=1711240478:RT=1712018952:S=ALNI_MakCljffK6VdSLlCkzPk8hBZmP9LQ; __eoi=ID=33320d6f248e4ae9:T=1711240478:RT=1712018952:S=AA-AfjYf1uKwpbMgET6R482nyN0s; token=${token}; FCNEC=^%^5B^%^5B^%^22AKsRol_CfJkrwswR5lUCAaSkOXNRlb9nKUFO-tVOsI_govj0Dz7uF1RvOEj0nka_u2S-dzilmFo9AdnePR9aQcL0H6tOcX-aXpMd96JXu9JmnQ6Y4jQzvGttELtDJLFHe7G8vR03YsabsCIX7lgiaOMxwAVEfDlT0A^%^3D^%^3D^%^22^%^5D^%^2Cnull^%^2C^%^5B^%^5B2^%^2C^%^22^%^5B^%^5B^%^5B^%^5B1^%^2Cnull^%^2C^%^5B1711924913^%^2C809490000^%^5D^%^2C10^%^5D^%^5D^%^5D^%^2C^%^5Bnull^%^2C6^%^2C^%^5B1711980291^%^2C351215000^%^5D^%^5D^%^5D^%^22^%^5D^%^5D^%^5D; _ga_K836MS1B0K=GS1.1.1712018950.5.1.1712019000.10.0.0^`

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
