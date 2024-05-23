import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;



// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Determine the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainPath = path.join(__dirname, "main");

// Serve static files from the "main" directory
app.use(express.static(mainPath));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/schedule", file: "schedule.html" },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(mainPath, route.file));
  });
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
