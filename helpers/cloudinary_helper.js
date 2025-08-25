
const cloudinary = require('../config/cloudinary');

const uploadtocloudinary = async(filepath)=>{
    try{
        const result = await cloudinary.uploader.upload(filepath);

        return{   
            url: result.secure_url,
            publicid: result.public_id,
               
        };

    }catch(e){
        console.error("error while uploading to cloudinary",e);
        throw new Error("error while uploading to cloudinary");
        
    }
}

module.exports= {
    uploadtocloudinary
}