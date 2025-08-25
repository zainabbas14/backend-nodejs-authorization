
const express = require('express');
const {uploadImageController, fetchimagecontroller,deleteimagecontroller} = require('../controllers/image-controller');
const authMiddleware = require('../middleware/auth-middleware');
const adminMiddleware= require('../middleware/admin-middleware');
const uploadmiddleware = require('../middleware/upload-middleware');


const router = express.Router();

//upload image
router.post('/upload', authMiddleware, adminMiddleware,uploadmiddleware.single('image'), uploadImageController);

//get all images
router.get('/get',authMiddleware,fetchimagecontroller)

router.delete('/:id',authMiddleware,adminMiddleware,deleteimagecontroller)



module.exports= router;