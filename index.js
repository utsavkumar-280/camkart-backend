const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
require('dotenv').config();


const dbConnection = require('./db/dbConnect.js')
const route404Handler = require('./middlewares/route404Handler');
const errorHandler = require('./middlewares/errorHandler');


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
  if (true) {
    res.json({ success: true, message: "Hey, What's up?" });
  } 
  else {
    throw Error("Urrey Bhai, error hogaya");
  }
});

app.use(route404Handler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});