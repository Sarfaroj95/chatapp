const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const bodyParser = require("body-parser");
const config = require("./config/dev");
const UserRouter = require("./routers/rouer");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(config.DB_URL, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false 
},
 (err, doc) => {
  if (err) {
    console.log(err);
  } else {
    console.log("conected successfully");
  }
});

app.use(bodyParser.json());

app.use("/api/v1/user/", UserRouter);
app.get("/", function (req, res) {
  res.send("I'm Running on the Server.");
});
app.get("/test", function (req, res) {
  res.send("App is running properly...");
});
app.get("/wow", function (req, res) {
  res.send("I like u");
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
  console.log(`app is running on http://localhost:${PORT}`);
});
