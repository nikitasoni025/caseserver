import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema({
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
    }
},{timestamps:true});


const admins=new mongoose.model('admins',AdminSchema);

export default admins;