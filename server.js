
require('dotenv').config() 
const express = require('express'); 
const app =express(); 
const connectToDB = require('./database/db');
const authroutes = require('./routes/auth-routes');
const homeroutes = require('./routes/home-routes');
const adminroutes = require('./routes/admin-routes');
const uploadimageroutes = require('./routes/image-routes');

connectToDB();

//middleware
app.use(express.json());
app.use('/api/auth',authroutes);
app.use('/api/home', homeroutes);
app.use('/api/admin', adminroutes);
app.use('/api/image',uploadimageroutes);


const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{ 
    console.log(`server now running at port ${PORT}`); 
})