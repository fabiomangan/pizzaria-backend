import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_APY_KEY as string,
    api_secret: process.env.CLOUDINARY_APY_SECRET as string
})

export default cloudinary;