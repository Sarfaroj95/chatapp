const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const mainuserSchema = new Schema({
  first_name: {
    type: String,
    min: [4, "Too short, short 4 character"],
    max: [32, "To long, Max is 32 character "]
  },
  last_name: {
    type: String,
    min: [4, "Too short, short 4 character"],
    max: [32, "To long, Max is 32 character "]
  },

  email: {
    type: String,
    min: [4, "Too short, short 4 character"],
    max: [32, "To long, Max is 32 character "],
    unique: true,
    lowercase: true,
    //	require: 'Email is require',
    match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/]
  },

  password: {
    type: String,
    min: [4, "Too short, short 4 character"],
    max: [32, "To long, Max is 32 character "]
    //	require: 'password is required'
  }
});


mainuserSchema.methods.hasSamePasswrod = function (requestedPassword) {
  return bcrypt.compareSync(requestedPassword, this.password);
}

mainuserSchema.pre('save', function (next) {
  const mainuser = this;

  bcrypt.geneSalt(10, function (err, salt) {
    bcrypt.hash(mainuser.password, salt, function (err, hash) {
      mainuser.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("Mainuser", mainuserSchema);
