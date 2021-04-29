const mongoose = require("mongoose");

const plantModel = new mongoose.Schema({
  payload: String,
});

module.exports = mongoose.model("Plant", plantModel);
