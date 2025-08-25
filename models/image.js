
const mongoose = require('mongoose');

const imageschema = new mongoose.Schema({
    url : {
        type : String,
        required: true,
    },
    publicid : {
        type : String,
        required : true,
    },
    uploadedby : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
},{timestamps : true});

module.exports = mongoose.model('image',imageschema);