//require('dotenv').config({path : './env'})


// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import {app} from './app.js'
dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT ||8000 ,() =>{
        console.log(`Server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err) => {
    console.log("Mongo DB connection failed !! ",err);
    
})




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