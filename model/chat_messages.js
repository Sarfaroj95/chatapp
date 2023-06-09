const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  user: { type: String },
  text: { type: String },
  createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Message", messageSchema);