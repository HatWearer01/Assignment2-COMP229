/*user.js - Tom Harari - 301139588 - 10/31/2022*/

let mongoose = require("mongoose");

let User = mongoose.Schema(
  {
    Username: String,
    Password: String,
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", User);