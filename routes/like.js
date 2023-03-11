const PostModel = require("../schema/postmodel")
const express = require('express');
const protected = require("../middleware/protected");
const router = express.Router();


router.put("/like" , protected , (req , res)=>{

   PostModel.findByIdAndUpdate(req.body.tweetId,{
    $push: { likes: req.user._id }
}, {
    new:true
}).populate("postuser" , "_id fullname").exec((error , result)=>{
    if(error){
        res.status(400).send("some error while the time of like the tweet")
    }else{
        console.log(result);
        res.status(200).json({likesCount:result.likes.length})
    }
})

    //console.log(req.user._id)
    //res.send("ok")
})

module.exports = router