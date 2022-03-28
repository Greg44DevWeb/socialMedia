const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multerPost = require("../middlewares/multerPost-config");

router.get("/getAll", auth, postController.getPosts);
router.post("/", auth, multerPost, postController.createPost);
router.post("/byAuthor", postController.getPostsByAuthor);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", multerPost, postController.modifyPost);

module.exports = router;