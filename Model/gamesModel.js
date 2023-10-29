import mongoose  from "mongoose";

const gamesSchema=new mongoose.Schema({
    seq:{
        type:Number,
    },
    gamename:{
        type:String,
        required:true
    },
    gametype:{
        type:String
    },
    time:{
        type:String
    },
    result:{
        type:String
    },
    islive:{
        type:Boolean,
        default:false
    },
    live_start_time:{
        type:String,
    },
    live_end_time:{
        type:String,
    },
    hilite:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    owner_id:{
        type:String
    },
    jodi_id:{
        type:String
    },
    panel_id:{
        type:String
    }

},{timestamps:true});


const games=new mongoose.model('games',gamesSchema);

export default games;