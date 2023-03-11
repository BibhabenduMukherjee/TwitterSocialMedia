const express = require("express")
const router = express.Router();

const User = require("../schema/user")


router.get("/originalperson/:id" , async(req , res)=>{
const _id=req.params.id;
const result = await User.findById({_id});

console.log(result);
res.status(200).send(result);
})


module.exports = router