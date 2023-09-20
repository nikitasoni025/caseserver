import mongoose  from "mongoose";

const netWeeklySchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},{timestamps:true});


const netWeekly=new mongoose.model('netWeekly',netWeeklySchema);

export default netWeekly;