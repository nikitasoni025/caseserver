import mongoose from 'mongoose';

const luckyNumberSchema=new mongoose.Schema({
    shubhank:{
        type:String,
        required:true
    },
    finalank:[]
},{timestamps:true});

const luckynumbers=new mongoose.model('luckynum',luckyNumberSchema);

export default luckynumbers;