import mongoose from "mongoose";


const subSchema = new mongoose.Schema({
    value: {
        type: String
    },
    hilite: {
        type: Boolean,
        default: false
    }
}, { _id: false })

const jodiDataSchema = new mongoose.Schema({
    monday: subSchema,
    tueday: subSchema,
    wedday: subSchema,
    thuday: subSchema,
    friday: subSchema,
    satday: subSchema,
    sunday: subSchema

}, { timestamps: true })

const jodiSchema = new mongoose.Schema({

    title: { type: String, required: true },
    data: [jodiDataSchema],
    jodi_id: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });




const jodi = new mongoose.model('jodis', jodiSchema);

export default jodi;