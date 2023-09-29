import guessingTable from "../Model/guessingTableModel.js";

export const fetchGuessingTable = async (req, res) => {
  try {
    const guesses = await guessingTable.find();
    return res.status(200).json({ data: guesses,msg:"Fetching Finished" })
  } catch (error) {
    return res.status(400).json({ msg: "Guessing Table Fetching Failed" });
  }
}

export const createGuesingTable = async (req, res) => {

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: "All Fields Are Required" });
  }

  try {
    const add = new guessingTable({
      title,
      content
    })
    add.save();
    return res.status(200).json({ msg: "Guessing Table Added" });
  } catch (error) {
    return res.status(400).json({ msg: "Creation Of Table Failed" });
  }

}

export const updateGuessing = async (req, res) => {

  const { id, updateData } = req.body;

  try {

    const updatedDocument = await guessingTable.findOneAndUpdate(
      { 'content._id': id },
      { $set: { 'content.$': updateData } },
      { new: true }
    );

    if (!updatedDocument) {
      return res.status(404).json({ error: 'Content document not found' });
    }

    return res.status(200).json(updatedDocument.content);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}