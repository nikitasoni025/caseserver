import daynight from "../Model/dayNightModel.js";


export const fetchDayNight= async(req,res)=>{
    try {
        const adds= await daynight.find();
        return res.status(200).json({data:adds})
    } catch (error) {
        return res.status(400).json({msg:"Add Fetching Failed"});
    }
}

export const addDayNight=async(req,res)=>{
    const {title,content} = req.body;
    if(!content || !title){
        return res.status(400).json({msg:"All Fields Are Required"});
    }
    try {
        const add=new daynight({adContent:content});
        add.save();
        return res.status(200).json({msg:"Guessing Added Successfully"});
    } catch (error) {
        return res.status(400).json({msg:"Guessing Creation Failed !"}); 
    }
}


export const updateDayNight=async (req,res)=>{

    const {id,updateData}=req.body;
    if(!id || !updateData){
        return res.status(400).json({msg:"All Fields Are Required !"});
    }
    try {

        const result = await daynight.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "The Given Guessing Not Found" });
        }

        return res.status(200).json({ msg: 'Guessing Updated Successfully', data: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }

}