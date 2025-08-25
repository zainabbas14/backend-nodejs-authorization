
const mongoose=require('mongoose'); 
const connectToDB=async()=>{ 
    try{ 
        await mongoose.connect(process.env.MONGO_URI); 
        console.log('mongodb connected'); 
    }catch(e){ 
        console.error("mongodb connection failed",e); process.exit(1); } 
    } 
    module.exports = connectToDB;