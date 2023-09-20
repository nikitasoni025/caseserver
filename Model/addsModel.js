import mongoose  from "mongoose";

const addsSchema=new mongoose.Schema({
    adContent:{
        type:String,
        required:true
    }
},{timestamps:true});


const addmodel=new mongoose.model('adds',addsSchema);

export default addmodel;