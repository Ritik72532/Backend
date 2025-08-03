import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudnary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
    /*
      get user details from frontend
      validation - not empty 
      check if user already exists - username,email
      check for images and avatar
      upload them to cloudinary , avatar 
      create user object - create entry in db 
      remove password and refresh token field from response 
      check for user creation 
      return response
    */
    const { fullName, username, email, password } = req.body
    console.log("email: ", email)

    if (
        [fullName, username, email, password].some((field) =>
            field?.trim === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "Username or email already existed")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is compulsory")
    }
  const avatar = await uploadOnCloudnary(avatarLocalPath);
  const coverImage = await uploadOnCloudnary(coverImageLocalPath);

    if(!avatar){
         throw new ApiError(400,"Avatar is compulsory")
    }

    const user = await User.create({
        fullName,
        password,
        email,
        avatar : avatar.url,
        coverImage : coverImage?.url || "",
        username : username.toLowerCase()
    })

   const createdUser =  await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"Server issue while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User Registered Successfully")
    )
})
export {
    registerUser,
}