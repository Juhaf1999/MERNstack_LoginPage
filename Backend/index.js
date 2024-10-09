const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

//console.log(process.env.MONGODB_URL)

//MongoDb Connection
mongoose.connect(process.env.MONGODB_URL)
.then(() =>{
    console.log("MongoDb is Connected")
})
.catch((err) =>{
    console.log(err)
})

//schema
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type:String,
        unique: true
    },
    password:String,
    confirmPassword:String,
})
 const userModel = mongoose.model("user",userSchema) 

 //api
app.get("/",(req,res) =>{
    res.send("App is Running")
})


//Signup API
app.post("/signup",async(req,res) =>{
   console.log(req.body)
   const {email} = req.body

   userModel.findOne({email:email})
   .then((result) =>{
    console.log(result)
    if(result){
        res.send({message: "Email Id already registered", alert:false})
       }
       else{
        const data = userModel(req.body)
        const savedata = data.save()
        res.send({message: "Signup Successfully", alert:true})
       }
   })
   .catch((err) =>{
    console.log(err)
   })
   

})

//Login API
app.post("/login", async(req,res) =>{
    console.log(req.body)

    const {email} = req.body
    userModel.findOne({email:email})
   .then((result) =>{
    if(result){
        const loginDetail = {
            _id: result._id,
            lastName: result.lastName,
            email: result.email,
        }
        console.log(loginDetail)
        res.send({message: "Login Successfully", alert:true, data:loginDetail})
       }
       else{
        res.send({message: "Email not available, please signup", alert:false})

       }
   })
   .catch((err) =>{
    console.log(err)
   })
})

const PORT = process.env.PORT || 8080

app.listen(PORT,() =>{
    console.log("App is running port :",PORT)
})