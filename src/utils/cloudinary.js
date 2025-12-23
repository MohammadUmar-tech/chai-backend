import {v2 as cloudinary} from "cloudinary"
import { response } from "express";
import fs from "fs"

 cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret:process.env.CLOUDINARY_API_SECRET 
    });


const uploadOnCloudinary=async (localFilePath) => {

    try {

        if(!localFilePath) return "Could not find the path"
        //upload the file cloudinary
        const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //file is uploaded succssfully
        console.log("file is uploaded succssfully ",response.url)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temp[orary file as the uploaded operation got failed]
        return null
        
    }
}


export {uploadOnCloudinary}