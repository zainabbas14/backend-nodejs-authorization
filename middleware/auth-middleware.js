
const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {

    const authheader = req.headers['authorization'];
    console.log(authheader);
    const token = authheader && authheader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            success:false,
            message : "No token provided"
        });
    }

    try{
        const decodetoken = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodetoken);
        req.userinfo = decodetoken;
        next();
        

    }catch(e){
        return res.status(500).json({
            success:false,
            message : "error No token provided"
        });
    }

}

module.exports = authMiddleware;