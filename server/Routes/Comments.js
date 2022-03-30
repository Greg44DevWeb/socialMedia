//***** IMPORTS ******//
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const commentController = require('../Controllers/comments');

//***** ROUTES  ******/
router.post("/",auth, commentController.create);
router.get("/",auth, commentController.getComments);
router.delete("/:commentId/:postId", auth, commentController.deleteComments);

module.exports = router;