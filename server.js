import express from "express";
import dotenv from "dotenv";
import "./Database/db.js";
import router from "./Routes/routes.js";
import bodyParser from "body-parser";
import cors from "cors";
dotenv.config();


// CRATING AN EXPRESS APP
const app=express();
// app.use(cors({
//     origin: "https://caseserver.onrender.com",
//     credentials: true,
//     allowedHeaders: [
//       "set-cookie",
//       "Content-Type",
//       "Access-Control-Allow-Origin",
//       "Access-Control-Allow-Credentials",
//     ],
//   }));
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(router);
const port=process.env.PORT || 8000

// CRATONG A SERVER

app.listen(port,()=>{
    console.log("server started succesfully");
});




