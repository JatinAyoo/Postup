const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")

const {allPost , createPost , addBookmark , removeBookmark, getSavedPosts} = require("../controllers/Post"); 

router.get("/getPost", auth , allPost);
router.post("/createPost" , auth , createPost);

router.get("/savedPost" , auth , getSavedPosts);

router.post('/bookmark', auth, addBookmark);
router.post('/unbookmark', auth, removeBookmark);
module.exports = router