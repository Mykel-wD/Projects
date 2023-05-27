const express = require("express");
const path = require("path");
const mysql = require("mysql");
const server = express();
//sql setup
const sqlconn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "drive",
  port: 3001,
});
sqlconn.connect((err) => {
  if (err) console.log(err);
});

//http requests setup
server.use(express.json());

//login handle
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  sqlconn.query(
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
//register handle
server.post("/register", (req, res) => {
  const { email, password } = req.body;
  sqlconn.query(
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
          sqlconn.query(
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
//getnote
server.post("/getnote", (req, res) => {
  const { email } = req.body;
  sqlconn.query(
    `SELECT \`note\` FROM \`users\` WHERE \`email\` = '${email}'`,
    (error, results) => {
      if (error) {
        res.sendStatus(500);
      } else {
        const note = results[0].note;
        res.status(200).json({ note: note });
      }
    }
  );
});
//setnote
server.post("/setnote", (req, res) => {
  const { note, email } = req.body;
  sqlconn.query(
    `UPDATE \`users\` SET \`note\` = '${note}' WHERE \`email\` = '${email}'`,
    (error) => {
      if (error) {
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});
//App serving / Server setup
server.use(express.static(path.join(__dirname, "/client")));
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});
server.listen(3000, () => console.log("server started at 3000"));
