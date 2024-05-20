const express = require("express");
const fs = require("fs");
const axios = require("axios").default;
const tough = require("tough-cookie");
const { wrapper } = require("axios-cookiejar-support");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("dotenv").config();

// Set up cookie jar globally
const cookieJar = new tough.CookieJar();
const client = wrapper(axios.create({ jar: cookieJar }));

const mainPath = path.join(__dirname, "main");

app.use(express.static(mainPath));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/answers", file: "edpuzzle.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(mainPath, route.file));
  });
});




app.post("/edpuzzle-media", async (req, res) => {
  const { token, classId } = req.body;

  const csrfResponse = await client.get("https://edpuzzle.com/api/v3/csrf");
  const EdpuzzleCSRFToken = csrfResponse.data.CSRFToken;

  cookieJar.setCookieSync(`csrfToken=${EdpuzzleCSRFToken}`, "https://edpuzzle.com");


  const class_response = await client.get(
    `https://edpuzzle.com/api/v3/assignments/classrooms/${classId}/students?needle=`,
    {
      headers: {
        Cookie: `token=${token};`
},
    }
  );

  const Media_ID = class_response.data.teacherAssignments[0].contentId;
  console.log(Media_ID)

  const media_response = await client.post(
    `https://edpuzzle.com/api/v3/media/${Media_ID}`,
    {
      headers: {
        Cookie: `token=${token};`,
        "edpuzzleCSRF": EdpuzzleCSRFToken
      },
    }
  );

  res.json(media_response.data);

  console.log(media_response.data);
});





app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const csrfResponse = await client.get("https://edpuzzle.com/api/v3/csrf");
    const EdpuzzleCSRFToken = csrfResponse.data.CSRFToken;

    const response = await client.post(
      "https://edpuzzle.com/api/v3/users/login",
      {
        username,
        password,
        role: "student",
      },
      {
        headers: {
          "x-csrf-token": EdpuzzleCSRFToken,
        },
      }
    );
    const token = response.headers;
    res.json(token);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
