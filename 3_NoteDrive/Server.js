import { config } from "dotenv";
import express from "express";
import path from "path";
import mysql from "mysql";
import cors from "cors";

//basic setups
const __dirname = path.resolve();
config();
const server = express();
server.use(
  cors({
    origin: "https://notes-drive.onrender.com",
  })
);
server.use(express.json());

//SQL Connection setup
const sqlConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});
sqlConnection.connect((err) => {
  if (err) console.log(err);
});

//LogBox Component Section
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  sqlConnection.query(
    `SELECT * FROM \`users\` WHERE email ='${email}' AND password = '${password}'`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          const response = { success: true, data: results[0] };
          res.status(200).json(response);
        } else {
          const response = { success: false, data: "Username / password" };
          res.status(200).json(response);
        }
      }
    }
  );
});
server.post("/register", (req, res) => {
  const { email, password } = req.body;
  sqlConnection.query(
    `SELECT * FROM \`users\` WHERE email='${email}'`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        if (results.length > 0) {
          const response = { success: false, data: "Email already taken" };
          res.status(200).json(response);
        } else {
          sqlConnection.query(
            `INSERT INTO \`users\` (id,email,password,note) VALUES(NULL, '${email}', '${password}', ' ')`,
            (error) => {
              if (error) {
                console.log(error);
                res.sendStatus(500);
              } else {
                res
                  .status(200)
                  .json({ success: true, data: "Registered successfully" });
              }
            }
          );
        }
      }
    }
  );
});

//Notes Component Section
server.post("/getnotes", (req, res) => {
  const { email } = req.body;
  sqlConnection.query(
    `SELECT \`id\`, \`note\` FROM \`notes\` WHERE \`email\` = '${email}'`,
    (error, results) => {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        const notes = [];
        const ids = [];
        for (let noteObject of results) {
          notes.push(noteObject.note);
          ids.push(noteObject.id);
        }
        res.status(200).json({ ids: ids, notes: notes });
      }
    }
  );
});
server.post("/deletenote", (req, res) => {
  const { id } = req.body;
  sqlConnection.query(
    `DELETE FROM \`notes\` WHERE \`id\` = '${id}'`,
    (error) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});
server.post("/addnote", (req, res) => {
  const { note, email } = req.body;
  sqlConnection.query(
    `INSERT INTO \`notes\` (\`id\`,\`email\`,\`note\`) VALUES (NULL, '${email}', '${note}')`,
    (error) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// App serving / Server setup
server.use(express.static(path.join(__dirname, "/client")));
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});
server.listen(3000, () => console.log("server started at 3000"));
