import cookieParser from 'cookie-parser'
import express from 'express'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
    
}))
app.use(express.json({ limit: "16kb" })) //the data is coming in the format of json
// data is coming through url 
app.use(express.urlencoded({extended:true,limit: "16kb" }))

// if files like images and videos are coming 
app.use(express.static("public"))

app.use(cookieParser())
export {app}