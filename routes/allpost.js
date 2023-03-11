const PostModel = require("../schema/postmodel")
const express = require('express');
const protected = require("../middleware/protected");
const router = express.Router();


router.get("/allpost" , (req , res)=>{
    PostModel.find({}).populate("postuser","_id fullname profileImg").then((result)=>{
        res.status(200).json({posts:result})
    }).catch((err)=>{
    console.log(err)
    })
})



module.exports = router