import {v2 as cloudinary} from 'cloudinary';
import { response } from 'express';
import fs from "fs"
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudnary = async (localfilepath) => {
    try {
        if(!localfilepath) return null
     const response = await cloudinary.v2.uploader.upload(localfilepath,{
            resource_type : "auto"
           
            
        })
         console.log("local file path",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null;
    }
}
export {uploadOnCloudnary}