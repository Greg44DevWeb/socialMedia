//***** IMPORTS ******//
const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');
const commentController = require('../Controllers/comments');

//***** ROUTES  ******/
router.post("/addComment",auth, commentController.createComment);
router.get("/",auth, commentController.getComments);
router.delete("/:idComment", auth, commentController.deleteOneComment);
router.get("/:postId", auth, commentController.getCommentBypostId);
module.exports = router;