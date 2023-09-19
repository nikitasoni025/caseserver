import luckynumbers from "../Model/luckyNoModel.js";


export const createLuckyNum = async (req, res) => {


    const { shubhank,finalank} = req.body;

    try {  
            const addnum = new luckynumbers({
                shubhank,finalank
            });

            addnum.save();
            return res.status(200).json({ msg: "Lucky Number Added Successfully" });


    } catch (error) {

        console.log(error.message);
        return res.status(400).json({ msg: "Failed to add Numbers" });

    }

}

export const getluckyNum=async(req,res)=>{
    const id = req.query.id;
    try {
        const luckynum = await luckynumbers.findById(id);
        return res.status(200).json(luckynum);
    } catch (error) {
        return res.status(400).json({ msg: "fetching failes", error: error.message });

    }
}




export const updateLuckyNumbers= async (req,res)=>{

    try {
        const updateid=req.body.id;
        const updateData = req.body.updateData;

        const result = await luckynumbers.findByIdAndUpdate(updateid, updateData, { new: true });
        if (!result) {
            return res.status(400).json({ msg: "User not Found" });
        }

        return res.status(200).json({ msg: 'Uspades', result: result });

    } catch (error) {
        return res.status(400).json({ msg: 'Uspades Falotro' });

    }

}