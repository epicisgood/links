const express = require('express');
const fs = require('fs');
const axios = require('axios').default;
const tough = require('tough-cookie');
const { wrapper } = require('axios-cookiejar-support');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config(); 
discord_authorization = process.env.discord_authorization


// Set up cookie jar globally
const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

const mainPath = path.join(__dirname, '..', 'main');
app.use(express.static(mainPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(mainPath, 'index.html'));
});

app.get('/answers', (req, res) => {
  res.sendFile(path.join(mainPath, 'edpuzzle.html'));
});

app.get('/forms', (req, res) => {
  res.sendFile(path.join(mainPath, 'forms.html'));
});

app.post('/edpuzzle', async (req, res) => {
  try {
    if (!req.body || !req.body.token || !req.body.classId) {
      throw new Error('Token and classId are required.');
    }
    const { token, classId } = req.body;

    const DiscordRequest = {
      method: 'POST',
      url: 'https://canary.discord.com/api/v9/oauth2/authorize',
      params: {
        client_id: '839048670120247317',
        response_type: 'code',
        redirect_uri: 'https://api.schoolcheats.net/auth/callback',
        scope: 'identify guilds.join guilds email'
      },
      headers: {
        'Content-Type': 'application/json',
        authorization: discord_authorization
      },
      data: { permissions: '0', authorize: true, integration_type: 0 }
    };

    const discordAuthResponse = await client.request(DiscordRequest);
    const redirectUrl = discordAuthResponse.data.location;

    // Make request to get cookies
    await client.get(redirectUrl);

    // Extract token value from the cookie
    const cookies = client.defaults.jar.getCookiesSync('https://api.schoolcheats.net');
    const tokenCookie = cookies.find(cookie => cookie.key === 'token');
    const SchoolToken = tokenCookie ? tokenCookie.value : null;

    const CurrentEpochTime = Math.floor(Date.now() / 1000) % 10000000000;
    const response = await client.post('https://v2.schoolcheats.net/edpuzzle/assignments', {
      token,
      classId
    }, {
      headers: {
        'cookie': `__eoi=ID=33320d6f248e4ae9:T=1711240478:RT=${CurrentEpochTime}:S=AA-AfjYf1uKwpbMgET6R482nyN0s; token=${SchoolToken};`
      }
    });

    console.log(CurrentEpochTime);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
