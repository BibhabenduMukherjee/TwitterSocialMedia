const express = require("express")
const router = express.Router();

const _protected = require("../middleware/protected");
const PostModel = require("../schema/postmodel")



router.put("/dislike" , _protected , (req , res)=>{
    PostModel.findByIdAndUpdate(req.body.tweetId,{
        $pull: { likes: req.user._id }
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
    
})

module.exports = router