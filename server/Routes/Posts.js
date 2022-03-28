/*const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer");

router.get("/", auth, postController.getAllPosts);
router.post("/", auth, multer, postController.create);
router.post("/byAuthor", postController.getByAuthor);
router.delete("/:id", auth, postController.delete);
router.put("/:id", multer, postController.modify);

module.exports = router;*/