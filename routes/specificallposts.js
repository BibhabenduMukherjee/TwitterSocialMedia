const express = require("express")
const router = express.Router();


const PostModel = require("../schema/postmodel")


router.get("/specificallposts/:id", (req, res) => {
     const id = req.params.id
     console.log(id);
    PostModel.find({ postuser: id })
        .populate("postuser", "_id userjoin fullname profileImg followers following        ")
        .then((dbPosts) => {
            console.log(dbPosts)
            res.status(200).json({ posts: dbPosts })
        })
        .catch((error) => {
            console.log(error);
        })
});



module.exports = router