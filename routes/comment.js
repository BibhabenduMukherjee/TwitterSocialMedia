const express = require("express")
const router = express.Router();

const _protected = require("../middleware/protected");
const PostModel = require("../schema/postmodel")


router.put("/comment" , _protected , async(req , res)=>{

   console.log(req.body)
   console.log(req.user._id )

   const comment = { commentText: req.body.comment, created_at : Date.now() ,  commentedBy: req.user._id }
   


      try{
        const rss = await PostModel.findByIdAndUpdate(req.body.tweetId, {
            $push: { comments: comment }
        }, {
            new: true //returns updated record
        }).select("comments")
      
        res.status(200).json({totalcomment:rss.comments.length})

      }catch(err){
        res.status(200).json({err:"Some Error"})
      }

    
})

module.exports = router








