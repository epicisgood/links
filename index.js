import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainPath = path.join(__dirname, "src");

app.use(express.static(mainPath));

const routes = [
  { path: "/", file: "index.html" },
  { path: "/schedule", file: "schedule.html" },
  { path: "/lunches", file: "lunch.html" },
  { path: '/about', file: "about.html"},
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(mainPath, route.file));
  });
});





app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
