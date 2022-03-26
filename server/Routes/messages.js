// //********* IMPORTS **********/
// const express = require("express"); // express Method
// const router = express.Router(); // Router initialization
// const db = require("../config/db"); // database connection
// const auth = require("../Middlewares/auth.js");
// const multer = require("../Middlewares/multer-config");

// //***** CONTROLLERS IMPORTS *****//
// const msgCtrl = require("../Controllers/messages");
// const likesCtrl = require("../Controllers/likes");

// //***** ROUTES *****//
// router.get("/", auth, msgCtrl.getAllMessages);
// router.post("/", auth, multer, msgCtrl.createMessage);
// router.put("/:id", auth, multer, msgCtrl.modifyMessage);
// router.delete("/:id", auth, msgCtrl.deleteMessage);
// router.get("/:id", auth, msgCtrl.getOneMessage);

// module.exports = router;