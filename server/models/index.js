const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error("Connection error", e.message);
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
module.exports.Commit = require("./commit");
