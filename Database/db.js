import mongoose from "mongoose";
import dotenv from "dotenv";
import { colors } from "../contants.js";

dotenv.config();

const databaseurl = process.env.MONGO_URL;
mongoose.set("strictQuery", false);
mongoose.connect(databaseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log(`${colors.WhiteBackground}${colors.Black}DataBase Connected Successfully 🚀 ${colors.reset}`);
    }
).catch(
    (error) => {
        console.log(error.message);
    }
);
