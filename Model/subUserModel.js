import mongoose from "mongoose";


const subAdminSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    phonenumber:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"admin"
    },
    gameid:{
        type:String,
        required:true,
    },
    game:{
        type:String,
        required:true
    }

},{timestamps:true});


const subadmin=new mongoose.model('subadmins',subAdminSchema);

export default subadmin;