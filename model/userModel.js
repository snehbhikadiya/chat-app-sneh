const mongoose=require('mongoose');
const Schema=mongoose.Schema

const user=new Schema({
    name:String,
    email:String,
    password:String,
    phoneNo:String
})


const usermodel=mongoose.model('user',user);

module.exports=usermodel