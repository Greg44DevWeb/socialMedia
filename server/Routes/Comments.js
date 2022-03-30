//*****COMMENTS ROUTES ******//
const express = require('express');
const router = express.Router;
const auth = require('../Middlewares/auth');
const commentController = require('../Controllers/comments');


router.post("/",auth, commentController.create);
router.get("/",auth, commentController.getComments);
router.delete("/:commentId/:postId", auth, commentController.delete);


module.exports = router;