const mongoose=require("mongoose")
const registerSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    isAdmin : {
        type:Boolean,
        default: false
    },
    balance:{
        type:Number,
        default:0
    }
})
const RegisterModel =mongoose.model("register",registerSchema)
module.exports=RegisterModel