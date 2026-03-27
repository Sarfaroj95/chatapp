const express = require("express");
const jwt = require('jsonwebtoken');
const Mainuser = require("../controllers/con_user");
const Message = require("../controllers/con_message");
const Chatuser = require("../controllers/con_chat_user");
const router = express.Router();
const JWT_SECRET = "your_secret_key_here";


const verifyToken = (req, res, next) => {
  // Get token from the 'Authorization' header
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      message: "Access Denied: No Token Provided or Invalid Format"
    });
  }
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer TOKEN"
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified; // Add user data to the request object
    next(); // Pass control to the actual API function
  } catch (err) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

router.post("/register", Mainuser.Register);
router.post("/login", Mainuser.Login);
router.get("/userdata", Mainuser.userdata);
router.get("/sushanta", Mainuser.userdatasunt);

router.get("/userdata/:id", Mainuser.getuserById);
router.post("/update/:id", Mainuser.update);
router.delete("/delete/:id", Mainuser.deleteRow);

router.post("/adduser", Mainuser.AddUser);
router.get("/subuser", Mainuser.SubUser);
router.get("/subuser/:id", Mainuser.getSubUserById);
router.post("/subuser/:id", Mainuser.SubUpdate);
router.delete("/subuser/:id", Mainuser.SubDelete);

router.post("/todo", Mainuser.AddTodo);
router.get("/todolist", Mainuser.TodoList);
router.get("/tododetails/:id", Mainuser.TodoDetails);
router.post("/todoupdate/:id", Mainuser.TodoUpdate);
router.delete("/tododelete/:id", Mainuser.TodoDelete);

router.post("/todosushanta", Mainuser.AddTodo2);
router.get("/todolistsushanta", Mainuser.TodoList2);


// Chat-User Section
router.post("/chatuseradd", verifyToken, Chatuser.ChatUserAdd);

router.post("/chatuserup/:id", Chatuser.ChatUserUpdate);
router.get("/chatuserget", Chatuser.ChatUserGet);
router.get("/chatuserget/:id", Chatuser.ChatUserGetById);
router.delete("/chatuser/:id", Chatuser.RemoveChatUser);


// for chat app
router.post("/chatuserlog", Chatuser.ChatUserLogin);
router.post("/message", verifyToken, Message.Messages);
router.get("/allmessage", verifyToken, Message.getMessages);

module.exports = router;
