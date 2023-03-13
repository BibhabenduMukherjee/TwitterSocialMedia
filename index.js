const express = require("express")
const app = express();
app.use(require("cors")())
app.disable("x-powered-by")
app.set("keep-alive")
app.use(express.json())
const dbConnection = require("./Database/db")
const router = require("./routes/register")
dbConnection()
//all routes for REST

app.use(require("./routes/login"))
app.use(require("./routes/createpost"))
app.use(require("./routes/allpost"))
app.use(require("./routes/imageupload"))
app.use(require("./routes/like"))
app.use(require("./routes/dislike"))
app.use(require("./routes/comment"))
app.use(require("./routes/singletweet"))
app.use(require("./routes/getmytweet"))
app.use(require("./routes/specificallposts"))
app.use(require("./routes/follow"))
app.use(require("./routes/singleperson"))
app.use(require("./routes/includefollow"))
app.use(require("./routes/imageprofile"))
app.use(require("./routes/updateduser"))
app.use(require("./routes/unfollow"))
 app.use(router)

const date = new Date(Date.now())
//console.log(date.toLocaleDateString("en-IN"))

app.listen(3002 , ()=>{
console.log("hello")    
})
