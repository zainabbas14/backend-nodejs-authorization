
const express = require('express');
const authMiddleware= require('../middleware/auth-middleware');
const adminMiddleware= require('../middleware/admin-middleware');
const router = express.Router();

router.get("/welcome",authMiddleware , adminMiddleware , (req, res) => {
    const {username,id,role}= req.userinfo;
    res.json({
        message: "Welcome to the admin page",
        username,
        _id : id,
        role,
    });
});

module.exports = router;