import express from "express";
const PORT = 8080;

const app = express();

app.listen(PORT, () => console.log("Live on http://localhost:8080"));

app.get("/log", (req, res) => {});

app.post("/log", (req, res) => {});
