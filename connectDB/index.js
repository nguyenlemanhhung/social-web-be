const mongoose = require("mongoose");

const url =
  "mongodb+srv://nohssiw1905:ailopdu281186.@mindxnodejs.b99ioni.mongodb.net/social-web";

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(url);
    console.log("database connect successfully");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToDB;
