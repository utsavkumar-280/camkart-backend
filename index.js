const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();


const dbConnection = require('./db/dbConnect.js')


const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(cors());

dbConnection();

app.get("/", (req, res) => {
  res.send("Welcome to Camkart Apis");
});
app.get("/hello", (req, res) => {
  res.json({success:true,message:"Hey, What's up?"});
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});