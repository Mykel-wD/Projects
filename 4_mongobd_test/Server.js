import { config } from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import { MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcrypt";
//Basic setups
const __dirname = path.resolve(); // current absolute project path
config(); // .env config import
const server = express();
server.use(cors()); // cross platform
server.use(express.json()); // http requests

//Database config
const mongoClient = new MongoClient(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
});
const db = mongoClient.db("noteDrive");
const notes = db.collection("notes");
const users = db.collection("users");

//Component LogForm
server.post("/register", async (req, res) => {
  const { email, password, name, surname, age } = req.body;
  const exist = await users.findOne({ email: email });
  const hashPassword = await bcrypt.hash(password, 10);
  if (exist) {
    return res
      .status(200)
      .json({ success: false, message: "email already taken" });
  } else {
    await users.insertOne({ email, hashPassword, name, surname, age });
    return res.status(200).json({ success: true });
  }
});
server.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await users.findOne({ email: email });
  if (!user) {
    return res.status(200).json({ success: false, message: "Wrong email / password" });
  } else {
    const pass = await bcrypt.compare(password, user.hashPassword);
    if (pass) {
      return res.status(200).json({ success: true });
    } else {
      return res
        .status(200)
        .json({ success: false, message: "Wrong email / password" });
    }
  }
});

//Component Account
server.post("/getuser",async (req,res)=>{
  const {email} = req.body;
  const user = await users.findOne({email:email});
  if(user){
    return res.status(200).json({name:user.name, surname:user.surname, age:user.age});
  }else{
    return res.status(401).json({error:"server error"})
  }
})
server.post("/changepassword", async (req, res) => {
  const { email, password, password2 } = req.body;
  const user = await users.findOne({ email: email });
  if (!user) {
    return res.status(500).json({ error: "Server Error" });
  } else {
    const pass = await bcrypt.compare(password, user.hashPassword);
    if (!pass) {
      return res.status(500).json({ error: "Wrong password!" });
    } else {
      const hashPassword = await bcrypt.hash(password2,10)
      const update = {$set: {hashPassword:hashPassword}};
      users.updateOne({email:email}, update, (err)=>{
        if(err){
          return res.status(500).json({error: "server error"});
        }
      })
      return res.status(200).json({success:true})
    }
  }
});

//end host setup
server.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/index.html"));
});
server.use(express.static(path.join(__dirname, "/client")));
server.listen(3000, () => console.log("server started at 3000"));
