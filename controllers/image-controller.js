const image = require('../models/image');
const { uploadtocloudinary } = require('../helpers/cloudinary_helper');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

const uploadImageController = async(req,res) => {
    try{
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }
        //upload to cloudinary
        const {url,publicid} = await uploadtocloudinary(req.file.path);

        //save to db
        const newImage = new image({
            url,
            publicid,
            uploadedby: req.userinfo.id
        })

        await newImage.save();
        //fs.unlinkSync(req.file.path);

        return res.status(201).json({
                success: true,
                message: "image uploaded suucesfully",
                image : newImage
            });

    }catch(e){
        console.log("error",e);
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
        
    }

};

const fetchimagecontroller= async(req,res) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit= parseInt(req.query.limit) ||5;
        const skip = (page-1) * limit;

        const sortby=req.query.sortby || 'createdAt';
        const sortorder = req.query.sortorder == 'asc' ? 1 : -1;
        const totalimages = await image.countDocuments();
        const totalpages = Math.ceil(totalimages/limit);

        const sortobj={};
        sortobj[sortby] = sortorder
        const images = await image.find().sort(sortobj).skip(skip).limit(limit);

        if(images){
            res.status(200).json({
                success: true,
                currentpage: page,
                totalpages : totalpages,
                totalimages:totalimages,
                data: images,
            })
        }

    }catch(e){
        console.log("error",e);
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
        
    }

};

//same admin that uploaded image can delete it only
const deleteimagecontroller= async(req,res) => {
    try{
        const getcurrentimageid = req.params.id;
        const userid=req.userinfo.id;
        const imagedata = await image.findById(getcurrentimageid);


        //image uploaded?
        if(!imagedata){
            return res.status(404).json({  // ADDED return
                success: false,
                message: "Image not found",
            });
        }

        //uploaded by same user who wants to delete it
        if(imagedata.uploadedby.toString()!==userid){
            return res.status(403).json({  
                success: false,
                message: "You are not authorised to delete this image",
            });

        }

        //delete from cloudinary
        await cloudinary.uploader.destroy(imagedata.publicid);

        //deletefrom mongodb
        await image.findByIdAndDelete(getcurrentimageid);

        res.status(200).json({
                success: true,
                message:"Image deleted succesfully",
            });
        



    }catch(e){
        console.log("error",e);
        res.status(500).json({
            success:false,
            message:"Something went wrong",
        });
        
    }

};

module.exports = { 
    uploadImageController,
    fetchimagecontroller,
    deleteimagecontroller 
};