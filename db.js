const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const { MONGOURI } = require("./config/keys");
const mongoURI = "";
const connectToMongo = async () => {
  mongoose.connect(mongoURI, () => {
    console.log("Connected to Database Successfully");
  });
};
module.exports = connectToMongo;
