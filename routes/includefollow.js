const User = require("../schema/user")
const express = require('express');
const protected = require("../middleware/protected");
const router = express.Router();

router.get("/includefollow/:id" , protected,  async(req , res)=>{
const _id = req.params.id;
const result = await User.findOne({_id}).select("followers");
//console.log(req.user._id)
//const val = req.user._id;
//console.log(val.toString())
if(result.followers.includes(req.user?._id.toString())){
    res.send("yes");
}else{
    res.send("no")
}
//console.log(result.followers)

})



module.exports= router