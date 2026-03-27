const { normalizeErrors } = require("../helper/mongoose");
const Chatuser = require("../model/chat_user");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "your_secret_key_here";

exports.ChatUserAdd = function (req, res) {
    Chatuser.findOne({ username: req.body.username }, function (err, existingUser) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      } else {
        if (existingUser) {
          return res.status(422).send({
            errors: [{ username: "Invalid", details: "Username is already exists" }]
          });
        } else {
          const chatuser = req.body;
          const cuser = new Chatuser(chatuser);
          cuser.save(function (err) {
            if (err) {
              return res
                .status(422)
                .send({ errors: normalizeErrors(err.errors) });
            } else {
              return res.json({ register: "Successful" });
            }
          });
        }
      }
    });
  };

// --- Login Chat User ---

// exports.ChatUserLogin = function (req, res) {
//     const { username, passcode } = req.body;

//     Chatuser.findOne({ username: username, passcode: passcode }, function (err, user) {
//       if (err) {
//         console.log(err);
//         return res.status(422).send({ errors: normalizeErrors(err.errors) });
//       }

//       if (!user) {
//         return res.status(422).send({
//           errors: [
//             { username: "Invalid User", details: "Please Check Username or Passcode" }
//           ]
//         });
//       }
//       return res.json({ success: true, "user_id": user._id });
//     });
//     // res.json({'success' : true});
//   };


// Move this to a .env file later for security!

exports.ChatUserLogin = function (req, res) {
  const { username, passcode } = req.body;

  Chatuser.findOne({ username: username, passcode: passcode }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        errors: [
          { username: "Invalid User", details: "Please Check Username or Passcode" }
        ]
      });
    }

    // --- NEW TOKEN LOGIC START ---
    // 1. Create the token (payload, secret, options)
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' } // Token lasts for 24 hours
    );

    // 2. Return the token to the client
    return res.json({
      success: true,
      user_id: user._id,
      token: token  // The client will save this string
    });
    // --- NEW TOKEN LOGIC END ---
  });
};

//  --- Get Chat All User ---
exports.ChatUserGet = function (req, res) {
    Chatuser.find({})
      .select("name")
      .select("username")
      .select("passcode")
      .exec(function (err, foundUsers) {
        res.json(foundUsers);
      });
  };

//  --- Get Chat user by ID ---
  exports.ChatUserGetById = function (req, res) {
    Chatuser.findById({_id: req.params.id})
      .select("name")
      .select("username")
      .select("passcode")
      .exec(function (err, foundUsers) {
        res.json(foundUsers);
      });
  };

//  --- Update Chat User ---
exports.ChatUserUpdate = function (req, res) {

    Chatuser.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name,
        username: req.body.username,
        passcode: req.body.passcode

      },
      {
        new: true
      },
      (err, doc) => {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
        } else {
          res.json({ success: true });
          console.log("Updated...");
        }
      }
    );
  };


// --- Remove Chat User ---

exports.RemoveChatUser = function (req, res) {
    Chatuser.findByIdAndRemove({ _id: req.params.id }, function (err) {
      if (err) {
        console.log("err");
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      console.log("Deleted...");
      // return res.status(200).send("done");
      return res.json({ Delete: true });
    });
  };
