const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose
      .connect("mongodb://localhost:27017/education_dev")
      .then(() => console.log("Connected successfully!!"));
  } catch (err) {
    console.log("Connected failure!!");
  }
}

module.exports = { connect };
