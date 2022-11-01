/*contact.js - Tom Harari - 301139588 - 10/31/2022*/

let mongoose = require("mongoose");

let Contact = mongoose.Schema(
  {
    Name: String,
    Number: String,
    Email: String
  },
  {
    collection: "Contacts",
  }
);

module.exports = mongoose.model("Contact", Contact);