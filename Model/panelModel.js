import mongoose  from "mongoose";

const panelSubSchema=new mongoose.Schema({
    value:[],
    hilite:{
        type:Boolean,
        default:false
    }
},{_id:false});


const panelDataSchema=new mongoose.Schema({
    date: [],
    monday: panelSubSchema,
    tueday: panelSubSchema,
    wedday: panelSubSchema,
    thuday: panelSubSchema,
    friday: panelSubSchema,
    satday: panelSubSchema,
    sunday: panelSubSchema
},{timestamps:true})

const panelSchema=new mongoose.Schema({

    title:{type:String,required:true},
    data:[panelDataSchema],
    panel_id:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});


const panel=new mongoose.model('panels',panelSchema);

export default panel;