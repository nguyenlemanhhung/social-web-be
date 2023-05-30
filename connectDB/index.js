const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log("database connect successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDB;
