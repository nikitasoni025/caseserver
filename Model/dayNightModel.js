import mongoose  from "mongoose";

const dayNightSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});


const daynight=new mongoose.model('daynight',dayNightSchema);

export default daynight;