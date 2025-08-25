
const express = require("express");
const authMiddleware= require('../middleware/auth-middleware');
//const {route} = require('./auth-routes');
const router = express.Router();

router.get("/welcome",authMiddleware ,(req, res) => {
    const {username,id,role}= req.userinfo;
    res.json({
        message: "Welcome to the home page",
        username,
        _id : id,
        role,
    });
});

module.exports = router;