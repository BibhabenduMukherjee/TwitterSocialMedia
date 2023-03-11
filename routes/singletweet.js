const PostModel = require("../schema/postmodel")
const express = require('express');
const protected = require("../middleware/protected");
const router = express.Router();



router.get("/tweet/:_id" , protected , (req , res)=>{
    const _id = req.params._id
    
         PostModel.findById({_id}).populate("comments.commentedBy").populate("postuser") //comment owner
         
         .exec((error, result) => {
             if (error) {
                 return res.status(400).json({ error: error });
             } else {
              
                 res.json(result);
             }
         })
       
        //console.log(result);
        //res.status(200).json({result:result})
    
   
})


module.exports = router