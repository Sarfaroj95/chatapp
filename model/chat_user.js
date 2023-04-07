const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatuserSchema = new Schema({
name: { type: String },

username: { type: String,
    min: [6, "Too short, short 6 character"],
    max: [8, "To long, Max is 8 character "]
},

passcode: { type: String,
    min: [4, "Too short, short 4 character"],
    max: [6, "To long, Max is 6 character "] },

createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model("Chatuser", chatuserSchema);