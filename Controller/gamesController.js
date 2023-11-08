import games from "../Model/gamesModel.js";
import jodi from "../Model/jodiModel.js";
import panel from "../Model/panelModel.js";
import gamesValidations from "../Validation/gamesValidation.js";
import cron from 'node-cron';
import { v4 as uuidv4 } from 'uuid';


async function updateGameStatus() {
    const gamesData = await games.find();

    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (const game of gamesData) {
        const [startHour, startMinute] = game.live_start_time.split(':').map(Number);
        const [endHour, endMinute] = game.live_end_time.split(':').map(Number);

        if (
            (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))
        ) {
            game.islive = true;
        } else {
            game.islive = false;
        }

        await game.save();
    }
}




cron.schedule('* * * * *', updateGameStatus);


export const fetchAllGames = async (req, res) => {

    const limit = req.query.limit || 5;
    const page = req.query.page;
    const startIndex = (page - 1) * limit;
    try {
        const count = await games.countDocuments();
        const userData = await games.find({ isDeleted: false }).skip(startIndex).limit(limit).sort({ seq: 1 });
        return res.status(200).json({ data: userData, totalCount: count });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed" });
    }
}

export const fetchAllGamesWithoutLimit = async (req, res) => {
    try {
        const userData = await games.find({ isDeleted: false }).sort({ seq: 1 });
        return res.status(200).json({ data: userData });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed" });
    }
}
export const fetchAllGamesWithLive = async (req, res) => {
    try {
        const userData = await games.find({ islive: true, isDeleted: false });
        return res.status(200).json({ data: userData });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed" });
    }
}
export const fetchAllDeletedGames = async (req, res) => {
    try {
        const userData = await games.find({ isDeleted: true });
        return res.status(200).json({ data: userData });
    } catch (error) {
        return res.status(400).json({ msg: "Fetching Failed" });
    }
}

export const fetchGamesByfilter = async (req, res) => {
    const owner_id = req.query.owner_id;
    const limit = req.query.limit || 5;
    const page = req.query.page;

    const startIndex = (page - 1) * limit;

    if (!owner_id) {
        return res.status(400).json({ msg: "Owner Id Is required" });
    }

    try {

        const count = await games.countDocuments();
        const gameData = await games.find({ owner_id: owner_id }).skip(startIndex).limit(limit).sort({ seq: 1 });
        if (gameData.length <= 0) {
            return res.status(400).json({ msg: "No Game Found Associated With this Owner" });
        }

        return res.status(200).json({ data: gameData, totalCount: count });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Data Fetching Failed" });
    }

}

export const createGame = async (req, res) => {

    const { seq, gamename, gametype, time, result, owner_id } = req.body;

    const validatedata = { seq, gamename, gametype, time, result };
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
        const jodi_id = uuidv4() + gamename.split(" ")[0].slice(0, 3);
        const panel_id = uuidv4() + gamename.split(" ")[0].slice(0, 3);

        const gameData = new games({
            seq, gamename, gametype, time, result, owner_id: owner_id ? owner_id : "", jodi_id, panel_id, live_start_time: "", live_end_time: ""
        })

        await gameData.save();

        const jodidata = {
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
        const panelData = {
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

        const jodisave = new jodi({
            title: gamename + " Jodi Chart",
            data: [jodidata],
            jodi_id
        })
        const panelsave = new panel({
            title: gamename + " Panel Chart",
            data: [panelData],
            panel_id
        })

        await jodisave.save();
        await panelsave.save();

        return res.status(200).json({ msg: "Game Created Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ msg: "Game Creation Failed" });


    }




}

export const updateGame = async (req, res) => {
    const { id, updateData } = req.body;
    if (!id || !updateData) {
        return res.status(400).json({ msg: "All Fields Are Required !" });
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

export const updateOneGame = async (req, res) => {
    const { items } = req.body;



    try {
        // Update the items in the database
        for (const item of items) {
            await games.findByIdAndUpdate(item.id, { seq: item.seq });
        }

        res.status(200).json({ msg: 'Items updated successfully' });
    } catch (error) {
        console.error('Error updating items:', error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
}

export const updteSpecificGames = async (req, res) => {
    try {
        const { ids, updateData } = req.body;

        for (const id of ids) {
            const item = await games.findById(id);
            if (!item) {
                return res.status(400).json({ msg: 'Item not found' });
            }
            item.islive = updateData.islive;
            item.live_start_time = updateData.live_start_time;
            item.live_end_time = updateData.live_end_time;
            await item.save();
        }
        res.status(200).json({ message: 'Items updated successfully' });
    } catch (error) {
        res.status(400).json({ message: 'An error occurred while updating items' });
    }

}

export const fetchGamesWithPagination = async (req, res) => {

    const limit = req.query.limit || 5;
    const page = req.query.page;
    const status = req.query.status || false;
    const selected = req.query.selected || false

    const startIndex = (page - 1) * limit;
    try {
        const count = await games.countDocuments();
        const gameData = await games.find({ status: status, selected: selected }).skip(startIndex).limit(limit);
        return res.status(200).json({ data: gameData, totalCount: count });

    } catch (error) {
        return res.status(400).json({ msg: "fetching failes", error: error.message });

    }

}


export const deleteGame = async (req, res) => {
    const itemId = req.body.id;

    try {
        const item = await games.findByIdAndRemove(itemId);

        if (!item) {
            return res.status(400).json({ error: 'Item not found' });
        }

        return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        // return res.status(400).json({ error: 'Error deleting item' });
    }

}