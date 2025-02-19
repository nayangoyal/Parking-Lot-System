require("./config/db");
const express = require("express");
const bodyParser = express.json;
const cors = require("cors");
const { PORT } = process.env;

const app = express();
const whitelist = [
  "http://localhost:5173",
  "https://parking-system.vercel.app",
  "https://localhost", //This origin for mobile
]; // add your origins here
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Printing ORIGIN");
    console.log(origin);
    // used !origin because /admin/approve or reject me sending link via gmail..and on clicking that we dont have a origin
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Allowed ORIGIN request");
      callback(null, true);
    } else {
      console.log("Blacklisted ORIGIN request");
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));



// app.use(cors());
app.use(bodyParser());

app.use('/parking', require('./routes/parkingRoutes'));

const startApp = () =>{
  app.listen(PORT, ()=>{
    console.log(`GHMS Backend running on port ${PORT}`);
  });
};

startApp();