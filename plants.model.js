const mongoose = require("mongoose");

const plantModel = new mongoose.Schema({
  payload: {
    data: {
      n: String,
      u: String,
      v: Number,
      t: Date,
    },
  },
});

module.exports = mongoose.model("Plant", plantModel);
