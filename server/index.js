require("./config/db");
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const { PORT } = process.env;


const app = express();

app.use(cors());
app.use(bodyParser());

app.use('/parking', require('./routes/parkingRoutes'));

const startApp = () =>{
  app.listen(PORT, ()=>{
    console.log(`GHMS Backend running on port ${PORT}`);
  });
};

startApp();