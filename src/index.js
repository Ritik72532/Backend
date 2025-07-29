//require('dotenv').config({path : './env'})


// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})

connectDB();




/*
import e from "express";
const app = express()
( async () => {
    try {
        await mongoose.connect(`process.env.${MONGO_DB}/${DB_NAME}`)
        app.on("error", (error)=>{
            console.log("error:",error);
            
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.log("ERROR: ",error);
        
    }
})() */