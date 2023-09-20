import addmodel from "../Model/addsModel.js";

export const fetchAdds= async(req,res)=>{
    try {
        const adds= await addmodel.find();
        return res.status(200).json({data:adds})
    } catch (error) {
        return res.status(400).json({msg:"Add Fetching Failed"});
    }
}

export const addAd=async(req,res)=>{
    const {content} = req.body;
    if(!content){
        return res.status(400).json({msg:"Content Should Not Be Empty"});
    }
    try {
        const add=new addmodel({adContent:content});
        add.save();
        return res.status(200).json({msg:"Ad Added Successfully"});
    } catch (error) {
        return res.status(400).json({msg:"Ad Creation Failed !"}); 
    }
}


export const updateAd=async (req,res)=>{

    const {id,updateData}=req.body;
    if(!id || !updateData){
        return res.status(400).json({msg:"All Fields Are Required !"});
    }
    try {

        const result = await luckynumbers.findByIdAndUpdate(id, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "Add Not Found" });
        }

        return res.status(200).json({ msg: 'Add Updated Successfully', result: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }

}