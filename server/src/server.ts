import express from "express";
import cors from "cors";
import "./database/schema";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.listen(PORT, () => console.log("Server listening on port 3000..."));
