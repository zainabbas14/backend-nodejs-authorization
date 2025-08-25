const express = require('express'); 
const router = express.Router(); 
const {registeruser,loginuser,changepassword} = require('../controllers/auth-controller');
const authmiddleware = require('../middleware/auth-middleware');

router.post('/register',registeruser)
router.post('/login',loginuser)
router.post('/changepassword',authmiddleware,changepassword)







module.exports = router;