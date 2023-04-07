const Mainuser = require("../model/mod_user");
const Adduser = require("../model/mod_add_user");
const Todo = require("../model/todo_add");


const { normalizeErrors } = require("../helper/mongoose");

//register part
exports.Register = function (req, res) {
  Mainuser.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    } else {
      if (existingUser) {
        return res.status(422).send({
          errors: [
            { title: "Invalid email", details: "Email is already exists" }
          ]
        });
      } else {
        const user1 = req.body;
        //delete user1.passwordConfirmation;
        const user = new Mainuser(user1);
        user.save(function (err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          } else {
            return res.json({ register: true });
          }
        });
      }
    }
  });
  // res.json({username, email});
};
//register end part

// login part
exports.Login = function (req, res) {
  const { email, password } = req.body;

  Mainuser.findOne({ email: email, password: password }, function (err, user) {
    if (err) {
      console.log(err);
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (!user) {
      return res.status(422).send({
        errors: [
          { title: "Invalid User", details: "Please Check Email or Password" }
        ]
      });
    }
    return res.json({ success: true, data: user._id });
  });
  // res.json({'success' : true});
};
// fatch uerdata
exports.userdata = function (req, res) {
  Mainuser.find({})
    .select("first_name")
    .select("last_name")
    .select("email")

    // .select("password")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

// For sushant
exports.userdatasunt = function (req, res) {
  Mainuser.find({})
    .select("first_name")
    .select("last_name")
    .select("email")

    // .select("password")
    .exec(function (err, foundUsers) {
      res.json({ msg: foundUsers });
    });
};

exports.getuserById = function (req, res) {
  Mainuser.findById({ _id: req.params.id })
    .select("first_name")
    .select("last_name")
    .select("email")
    // .select("password")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

//update section
exports.update = function (req, res) {
  Mainuser.findOneAndUpdate(
    { _id: req.params.id },
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
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

// Delete user byID
exports.deleteRow = function (req, res) {
  Mainuser.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("err");
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    console.log("Deleted...");
    // return res.status(200).send("done");
    return res.json({ Delete: true });
  });
};

// add user
exports.AddUser = function (req, res) {
  Adduser.findOne({ email: req.body.email }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    } else {
      if (existingUser) {
        return res.status(422).send({
          errors: [{ title: "Invalid", details: "Email no is already exists" }]
        });
      } else {
        const adduser = req.body;
        const user = new Adduser(adduser);
        user.save(function (err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          } else {
            return res.json({ register: true });
          }
        });
      }
    }
  });
};

exports.SubUser = function (req, res) {
  Adduser.find({})
    .select("name")
    .select("mobile")
    .select("email")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

exports.getSubUserById = function (req, res) {
  Adduser.findById({ _id: req.params.id })
    .select("name")
    .select("mobile")
    .select("email")
    // .select("password")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

exports.SubUpdate = function (req, res) {
  Adduser.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email
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

exports.SubDelete = function (req, res) {
  Adduser.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("err");
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    console.log("Deleted...");
    // return res.status(200).send("done");
    return res.json({ Delete: true });
  });
};

//  Todo
exports.AddTodo = function (req, res) {
  Todo.findOne({ title: req.body.title }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    } else {
      if (existingUser) {
        return res.status(422).send({
          errors: [{ title: "Invalid", details: "Title is already exists" }]
        });
      } else {
        const todo = req.body;
        const user = new Todo(todo);
        user.save(function (err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          } else {
            return res.json({ register: true });
          }
        });
      }
    }
  });
};

exports.TodoList = function (req, res) {
  Todo.find({})
    .select("title")
    .select("body")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

exports.TodoDetails = function (req, res) {
  Todo.findById({ _id: req.params.id })
    .select("title")
    .select("body")
    .exec(function (err, foundUsers) {
      res.json(foundUsers);
    });
};

exports.TodoUpdate = function (req, res) {

  Todo.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      body: req.body.body

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

exports.TodoDelete = function (req, res) {
  Todo.findByIdAndRemove({ _id: req.params.id }, function (err) {
    if (err) {
      console.log("err");
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }
    console.log("Deleted...");
    // return res.status(200).send("done");
    return res.json({ Delete: true });
  });
};

// for sushanta
exports.AddTodo2 = function (req, res) {
  Todo.findOne({ title: req.body.title }, function (err, existingUser) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    } else {
      if (existingUser) {
        return res.status(422).send({
          errors: [{ title: "Invalid", details: "Title is already exists" }]
        });
      } else {
        const todo = req.body;
        const user = new Todo(todo);
        user.save(function (err) {
          if (err) {
            return res
              .status(422)
              .send({ errors: normalizeErrors(err.errors) });
          } else {
            return res.json(user);
          }
        });
      }
    }
  });
};

exports.TodoList2 = function (req, res) {
  Todo.find({})
    .select("title")
    .exec(function (err, foundUsers) {
      res.json(foundUsers[0]);
    });
};



