const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts");
const auth = require("../middlewares/auth");
const multerPost = require("../middlewares/multerPost-config");

router.get("/", auth, postController.getPosts);
router.post("/", auth, multerPost, postController.createPost);
/*router.post("/byAuthor", postController.getByAuthor);
router.delete("/:id", auth, postController.delete);
router.put("/:id", multer, postController.modify);*/

module.exports = router;