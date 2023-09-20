// import addmodel from "../Model/addsModel.js";
import netWeekly from "../Model/netweeklyModel.js";

export const fetchNetWeekly= async(req,res)=>{
    try {
        const net= await netWeekly.find();
        return res.status(200).json({data:net});
    } catch (error) {
        return res.status(400).json({msg:"Net Weekly Fetching Failed"});
    }
}

export const addNetWeekly=async(req,res)=>{
    const {title,content} = req.body;
    if(!content || !title){
        return res.status(400).json({msg:"All Fields Are Required !"});
    }
    try {
        const netweek=new netWeekly({title,content});
        netweek.save();
        return res.status(200).json({msg:"Ad Added Successfully"});
    } catch (error) {
        return res.status(400).json({msg:"Ad Creation Failed !"}); 
    }
}


export const updateNetWeekly=async (req,res)=>{

    const {id,updateData}=req.body;
    if(!id || !updateData){
        return res.status(400).json({msg:"All Fields Are Required !"});
    }
    try {

        const result = await netWeekly.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "Data Not Found" });
        }

        return res.status(200).json({ msg: 'Net Weekly Updated Successfully', result: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }

}