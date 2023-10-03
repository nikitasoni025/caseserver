import games from "../Model/gamesModel.js";
import jodi from "../Model/jodiModel.js";
import panel from "../Model/panelModel.js";
import gamesValidations from "../Validation/gamesValidation.js";
import {v4 as uuidv4} from 'uuid';


export const fetchAllGames = async (req, res) => {

    const limit = req.query.limit || 5;
    const page = req.query.page;
    const startIndex = (page - 1) * limit;
    try {
        const count = await games.countDocuments();
        const userData = await games.find().skip(startIndex).limit(limit).sort({ createdAt: -1 });
        return res.status(200).json({ data: userData, totalCount: count });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed" });
    }
}

export const fetchGamesByfilter=async(req,res)=>{
    const owner_id=req.query.owner_id;
    const limit = req.query.limit || 5;
    const page = req.query.page;

    const startIndex = (page - 1) * limit;

    if(!owner_id){
        return res.status(400).json({msg:"Owner Id Is required"});
    }

    try {

        const count = await games.countDocuments();
        const gameData = await games.find({owner_id:owner_id}).skip(startIndex).limit(limit).sort({ created_at: -1 });
        if(gameData.length <=0){
            return res.status(400).json({msg:"No Game Found Associated With this Owner"});
        }

        return res.status(200).json({ data: gameData, totalCount: count });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Data Fetching Failed"});        
    }

} 

export const createGame = async (req, res) => {

    const { gamename,gametype,time,result,owner_id} = req.body;

    const validatedata = { gamename,gametype,time,result};
    const { error, value } = gamesValidations.validate(validatedata);

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({ msg: "Validation Error !!", valerror: errors })
    }

    try {
        const preuser = await games.findOne({ gamename: { $regex: new RegExp(`^${gamename}$`, 'i') } });
        if (preuser) {
            return res.status(400).json({ msg: "This Game Name Is Already Present" });
        }
        const jodi_id=uuidv4()+gamename.split(" ")[0].slice(0,3);
        const panel_id=uuidv4()+gamename.split(" ")[0].slice(0,3);

        const gameData=new games({
            gamename,gametype,time,result,owner_id:owner_id ? owner_id : "",jodi_id,panel_id
        })

        await gameData.save();

        const jodidata={
            monday: {
                hilite: true,
                value: "85"
            },
            tueday: {
                hilite: false,
                value: "45"
            },
            wedday: {
                hilite: false,
                value: "15"
            },
            thuday: {
                hilite: false,
                value: "85"
            },
            friday: {
                hilite: false,
                value: "85"
            },
            satday: {
                hilite: false,
                value: "85"
            },
            sunday: {
                hilite: false,
                value: "85"
            }
        }
        const panelData={
            date: [
                "11-12-2022", "12-12-2022"
            ],
            monday: {
                hilite: false,
                value: ["123", "45", "678"]
            },
            tueday: {
                hilite: false,
                value: ["123", "45", "678"]
            },
            wedday: {
                hilite: false,
                value: ["123", "45", "678"]
            },
            thuday: {
                hilite: true,
                value: ["123", "45", "678"]
            },
            friday: {
                hilite: false,
                value: ["123", "45", "678"]
            },
            satday: {
                hilite: false,
                value: ["123", "45", "678"]
            },
            sunday: {
                hilite: false,
                value: ["123", "45", "678"]
            }
        }

        const jodisave= new jodi({
            title:gamename+" Jodi Chart",
            data:[jodidata],
            jodi_id
        })
        const panelsave=new panel({
            title:gamename+" Panel Chart",
            data:[jodidata],
            panel_id
        })

        const addJodi=await jodisave.save();
        const addpanel=await panelsave.save();

        return res.status(200).json({msg:"Game Created Successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg:"Game Creation Failed"});

        
    }




}

export const updateGame=async (req,res)=>{
    const {id,updateData}=req.body;
    if(!id || !updateData){
        return res.status(400).json({msg:"All Fields Are Required !"});
    }
    try {

        const result = await games.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "Game Not Found" });
        }

        return res.status(200).json({ msg: 'Game Updated Successfully', data: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Updation Failed' });

    }

}

export const fetchGamesWithPagination = async (req, res) =>{

    const limit = req.query.limit || 5;
    const page = req.query.page;
    const status = req.query.status || false;
    const selected=req.query.selected || false

    const startIndex = (page - 1) * limit;
    try {
        const count = await games.countDocuments();
        const gameData = await games.find({status:status,selected:selected}).skip(startIndex).limit(limit);
        return res.status(200).json({data:gameData, totalCount:count});

    } catch (error) {
        return res.status(400).json({msg:"fetching failes",error:error.message});
        
    }

}