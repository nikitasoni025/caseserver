import jodi from "../Model/jodiModel.js";

export const fetchAllJodis=async(req,res)=>{
  try {
    const jodiData=await jodi.find({isDeleted:false});
    if(jodiData && jodiData.length >0){
      return res.status(200).json({msg:"Jodi Data Fetched",data:jodiData});
    }else{
      return res.status(400).json({msg:"Jodi Data Not Found"});
    }
    
  } catch (error) {
    return res.status(400).json({msg:"Server Error"});
    
  }

}

export const fetchJodi = async (req, res) => {

    let id = req.query.id;
    let jodiData;
    try {
        if (id) {
            jodiData = await jodi.find({jodi_id:id}).sort({ createdAt: -1 });
            if (jodiData) {
                return res.status(200).json(jodiData);
            } else {
                return res.status(400).json({ msg: "Jodi Not Found" });
            }
        } else {
            return res.status(400).json({ msg: "Id is Required" });
        }

    } catch (error) {
        return res.status(400).json({ msg: error.message });
    }

}

export const createJodi=async (req,res)=>{
    try {
        const { jodiId, newData } = req.body;
    
        // Find the jodi by jodi_id
        const existingJodi = await jodi.findOne({ jodi_id: jodiId });
    
        if (!existingJodi) {
          return res.status(404).json({ error: 'Jodi not found' });
        }
    
        // Add the new data object to the data array
        existingJodi.data.push(newData);
    
        // Save the updated jodi object
        await existingJodi.save();
    
        return res.status(200).json({ message: 'Jodi data created successfully', data: existingJodi });
      } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
      }

}


export const updateJodi=async (req,res)=>{
    try {
    const { jodiId, dataId,newData } = req.body;

    // Find the jodi by jodi_id
    const existingJodi = await jodi.findOne({ jodi_id: jodiId });

    if (!existingJodi) {
      return res.status(404).json({ error: 'Jodi not found' });
    }

    // Find and update the specific data object within the data array
    const dataObjectToUpdate = existingJodi.data.id(dataId);

    if (!dataObjectToUpdate) {
      return res.status(404).json({ error: 'Data object not found' });
    }

    // Update the data object with the new data
    dataObjectToUpdate.set(newData);

    // Save the updated jodi object
    await existingJodi.save();

    return res.status(200).json({ message: 'Jodi data updated successfully', data: existingJodi });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export const updateOuterJodi=async (req,res)=>{

  const { id, updateData } = req.body;

  try {
    const jodiData = await jodi.findOneAndUpdate(
      { jodi_id: id },
      updateData,
      { new: true }
    );

    if (jodiData) {
      res.status(200).json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const deleteJodi=async(req,res)=>{
  try {
    const { jodiId, dataId } = req.body;

    // Find the Jodi document by its jodi_id
    const jodiData = await jodi.findOne({ jodi_id: jodiId });

    if (!jodiData) {
      return res.status(404).json({ error: 'Jodi not found' });
    }

    // Find and remove the subdocument by its ID
    const dataIndex = jodiData.data.findIndex((data) => data._id.toString() === dataId);

    if (dataIndex === -1) {
      return res.status(404).json({ error: 'Data not found' });
    }

    jodiData.data.splice(dataIndex, 1);

    // Save the Jodi document with the updated data array
    await jodiData.save();

    return res.status(200).json({msg:"Deleted"}); // Success, no content
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}