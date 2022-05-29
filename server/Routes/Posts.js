const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
// const authGetUser = require("../middlewares/authGetUser");
const auth = require("../Middlewares/auth");
const multer = require("../Middlewares/multerUser-config");

router.get("/getAll", auth, postController.getPosts);
router.post("/", auth, multer, postController.createPost);
router.post("/byAuthor", postController.getPostsByAuthor);
router.delete("/:id", auth, postController.deletePost);
router.put("/:id", multer, postController.modifyPost);

module.exports = router;