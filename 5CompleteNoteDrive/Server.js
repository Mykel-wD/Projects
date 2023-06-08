import { config } from "dotenv";
import express from "express";
import path from "path";
import mysql from "mysql";
import cors from "cors";

//basic setups
const __dirname = path.resolve(); // current absolute project path
config(); // .env config import
const server = express();
server.use(cors()); // cross platform
server.use(express.json()); // http requests

//Database config
const sql = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

//Component Section

//server index serving
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});
server.use(express.static(path.join(__dirname, "/client")));
server.listen(3000, () => console.log("server started at 3000"));
