require("dotenv").config();
const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

const connectToDB = async() => {
  try{
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connected");
  }catch(error)
  {
    console.log(error);
  }
}

connectToDB();