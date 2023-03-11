const express = require("express");
const _protected = require("../middleware/protected");
const router = express.Router();
// const jwt = require("jsonwebtoken")
const User = require("../schema/user")


router.put("/updateUserprofileimage" , _protected ,async(req, res)=>{
    const _id = req.user._id
    const data = req.body.update;
const updatedUser = await User.findByIdAndUpdate({_id} , {
    profileImg : data
}, {new:true})
console.log(updatedUser);
res.send(updatedUser)
} )



module.exports = router