//**** IMPORTS *****//
const express = require("express"); // express Method
const router = express.Router(); // Router initialization
const db = require("../config/db"); // database connection
const userCtrl = require("../Controllers/user");
const multer = require('../Middlewares/multerUser-config');
const authByTokenId = require('../Middlewares/auth');
const auth = require ('../Middlewares/authGetUser');

//***** ROUTES *****//
router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.delete("/remove/:id", userCtrl.delete);
router.put("/modifyprofile/:id", authByTokenId, multer, userCtrl.modifyProfilePicture);
router.put("/modifyAccount/:id", authByTokenId, userCtrl.modifyUserAccount);
router.put("/modifyPassword/:id", authByTokenId, userCtrl.modifyPassword);
router.post("/user", auth, userCtrl.getOne);
router.post("/getByName", auth, userCtrl.getByName);
module.exports = router;