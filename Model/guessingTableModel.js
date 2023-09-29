import mongoose  from "mongoose";


const valuesSchema=new mongoose.Schema({
    guessing: Number,
    patti: Number,
    jodi: Number,
},{_id:false})


const contentSchema=new mongoose.Schema({
    week:{
        type:String,
        required:true
    },
    values:[valuesSchema]

})

const guessingTableSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:[contentSchema]
},{timestamps:true});


const guessingTable=new mongoose.model('guessingTable',guessingTableSchema);

export default guessingTable;