const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likes");
const auth = require("../middlewares/auth");

router.post("/", auth, likeController.like);
router.post("/liked", auth, likeController.liked);


module.exports = router;