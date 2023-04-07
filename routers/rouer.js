const express = require("express");
const Mainuser = require("../controllers/con_user");
const Message = require("../controllers/con_message");
const Chatuser = require("../controllers/con_chat_user");
const router = express.Router();

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
router.post("/chatuseradd", Chatuser.ChatUserAdd);
router.post("/chatuserlog", Chatuser.ChatUserLogin);
router.post("/chatuserup/:id", Chatuser.ChatUserUpdate);
router.get("/chatuserget", Chatuser.ChatUserGet);
router.get("/chatuserget/:id", Chatuser.ChatUserGetById);
router.delete("/chatuser/:id", Chatuser.RemoveChatUser);


// for chat app
router.post("/message", Message.Messages);
router.get("/allmessage", Message.getMessages);

module.exports = router;
