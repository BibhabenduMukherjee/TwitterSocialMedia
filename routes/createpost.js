
const express = require('express');
const router = express.Router();

const protected = require('../middleware/protected');
const PostModel = require('../schema/postmodel');

router.post("/createpost", protected, (req, res) => {
    const { description, location, image } = req.body;
    if (!description || !location || !image) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({ description: description, location: location, image: image, created_at:Date.now(), postuser: req.user });
    postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((error) => {
            console.log(error);
        })
});





module.exports = router