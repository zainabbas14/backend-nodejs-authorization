
const mongoose = require('mongoose');
const userschema = mongoose.Schema({ 
    username : {
        type : String,
        required: true,
        unique : true,
        trim : true,
    },
    email : {
        type : String,
        required: true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        enum : ['user','admin'],//only allow user or admin
        default : 'user',
    }

},{timestamps:true})

module.exports = mongoose.model('user',userschema);