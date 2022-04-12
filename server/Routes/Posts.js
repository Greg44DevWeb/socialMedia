const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multer = require("../Middlewares/multer-config");

router.get("/getAll", /*auth,*/ postController.getPosts);
router.post("/", auth, multer, postController.createPost);
router.post("/byAuthor", postController.getPostsByAuthor);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", multer, postController.modifyPost);

module.exports = router;