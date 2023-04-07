const Message = require("../model/chat_messages");
const { normalizeErrors } = require("../helper/mongoose");


// Post Messages
exports.Messages = function (req, res) {
    const message = req.body;
    const data = new Message(message);
    data.save(function (err) {
      if (err) {
        return res
          .status(422)
          .send({ errors: normalizeErrors(err.errors) });
      } else {
        return res.json({ send: "Message send" });
      }
    });
  };
  
  // get Messages
  exports.getMessages = function (req, res) {
    Message.find({}).limit(50)
    .select("user")
    .select("text")
    .select("createdAt")
    .exec(function (err, Messages) {
      res.json(Messages);
    });
  };