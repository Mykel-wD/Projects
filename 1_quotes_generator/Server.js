const express = require("express");
const path = require("path");
const server = express();

//data
const quotes = require("./data/quotes");
const authors = require("./data/authors");

server.use(express.static(path.join(__dirname, "/client")));

server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});

server.get("/quotedata", (req,res)=>{
  const data ={
    quotes: quotes,
    authors: authors
  }
  res.json(data);
})
server.listen(3000, () => console.log("server started at 3000"));
