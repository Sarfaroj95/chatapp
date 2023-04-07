const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adduserSchema = new Schema({
  name: { type: String },
  mobile: { type: String },
  email: { type: String }
});

module.exports = mongoose.model("Adduser", adduserSchema);
