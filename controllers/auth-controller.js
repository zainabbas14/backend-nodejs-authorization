const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//register controller
const registeruser = async(req,res)=>{
    try{
        const{username,email,password,role} =req.body;

        //user already exist?
        const checkexistinguser = await user.findOne({$or : [{username},{email}]})
        if(checkexistinguser){
            return res.status(400).json({
                success:false,
                message:"user already exists",
            });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        //create new user finally
        //IMPORTANT PASS HASH PASSWORD
        const newlycreateduser = new user({
            username,
            email,
            password : hashedpassword,
            role : role || 'user'
        })

        await newlycreateduser.save();

        if(newlycreateduser){
            res.status(200).json({
                success:true,
                message:"User created Succesfully",
            });
        }else{
            res.status(400).json({
                success:false,
                message:"User could not be registered",
            });

        }


    }catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:"Registration error Please try again" ,
        });
        
    }
};


//login controller
const loginuser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if user exists
        const luser = await user.findOne({ username });
        if (!luser) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, luser.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid username or password",
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {username: luser.username, id: luser._id, role: luser.role },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: luser._id,
                username: luser.username,
                email: luser.email,
                role: luser.role,
                token
            }
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Login error, please try again",
        });
    }
};

const changepassword = async (req, res) => {
    try {
        const userid = req.userinfo.id;

        //extract old and new password
        const {oldpass , newpass}= req.body;

        //find current logged in user
        const p_user = await user.findById(userid);
        if (!p_user) {
            return res.status(400).json({
                success: false,
                message: "user not found !",
            });
        }

        //check if old password is correct
        const ismatch =  await bcrypt.compare(oldpass,p_user.password);

        if (!ismatch) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password",
            });
        }

        //newpassword
        const salt = await bcrypt.genSalt(10);
        const newhashedpassword = await bcrypt.hash(newpass,salt);

        p_user.password = newhashedpassword;
        await p_user.save();

        res.status(200).json({
            success: true,
            message: "Password change successful",
        });


    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "Incorrect password, please try again",
        });
    }
};

module.exports = {registeruser,loginuser,changepassword};