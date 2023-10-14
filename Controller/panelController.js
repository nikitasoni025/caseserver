import panel from "../Model/panelModel.js";

export const fetchAllPanel=async(req,res)=>{
  try {
    const panelData=await panel.find();
    if(panelData && panelData.length >0){
      return res.status(200).json({msg:"Panel Data Fetched",data:panelData});
    }else{
      return res.status(400).json({msg:"Panel Data Not Found"});
    }
    
  } catch (error) {
    return res.status(400).json({msg:"Server Error"});
    
  }

}

export const fetchPanel = async (req, res) => {

  let id = req.query.id;
  let panelData;
  try {
    if (id) {
      panelData = await panel.find({panel_id:id}).sort({ createdAt: -1 });
      if (panelData) {
        return res.status(200).json(panelData);
      } else {
        return res.status(400).json({ msg: "Panel Not Found" });
      }
    } else {
      return res.status(400).json({ msg: "Id is Required" });
    }

  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }

}

export const createPanel = async (req, res) => {
  try {
    const { panelId, newData } = req.body;

    const panelData = await panel.findOne({panel_id:panelId});

    if (!panelData) {
      return res.status(404).json({ error: 'Panel not found' });
    }

    panelData.data.push(newData);
    await panelData.save();

    res.status(200).json({ msg: "Panel Added Successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal Server Error' });
  }

}

export const updatePanel = async (req, res) => {
  try {
    const { panelId, dataId, newData } = req.body;

    const existingPanel = await panel.findOne({ panel_id: panelId });

    if (!existingPanel) {
      return res.status(404).json({ error: 'Panel not found' });
    }

    const dataObjectToUpdate = existingPanel.data.id(dataId);

    if (!dataObjectToUpdate) {
      return res.status(404).json({ error: 'Data object not found' });
    }

    dataObjectToUpdate.set(newData);

    await existingPanel.save();

    return res.status(200).json({ msg: 'Panel data updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}


export const deletePanel = async (req, res) => {
  try {
    const { panelId, dataId } = req.body;

    const panelData = await panel.findOne({ panel_id: panelId });

    if (!panelData) {
      return res.status(404).json({ error: 'Panel not found' });
    }

    const dataIndex = panelData.data.findIndex((data) => data._id.toString() === dataId);

    if (dataIndex === -1) {
      return res.status(404).json({ error: 'Data not found' });
    }

    panelData.data.splice(dataIndex, 1);

    await panelData.save();

    return res.status(200).json({ msg: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Internal Server Error' });
  }
}