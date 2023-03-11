const express=require("express")
const router = express.Router();

const PostModel = require("../schema/postmodel")
const _protected = require("../middleware/protected");

router.get("/myallposts", _protected, (req, res) => {
    PostModel.find({ postuser: req.user._id })
        .populate("postuser", "_id fullname profileImg")
        .then((dbPosts) => {
            console.log(dbPosts)
            res.status(200).json({ posts: dbPosts })
        })
        .catch((error) => {
            console.log(error);
        })
});


module.exports = router

