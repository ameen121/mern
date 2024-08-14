const User   = require("../models/user-model");
const bcrypt = require("bcryptjs");

// ---------------
//  Home Logic
// --------------
const home = async (req,res) => {
    try {
        res
        .status(200)
        .send('welcome to home page');
    } catch (error) {
        console.log(error);
    }
}
// ---------------
//  Register Logic
// ---------------
const register = async (req,res) => {
    try {
    
        const {username, email, phone, password } = req.body;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "user already exist"})
        }
        const userCreated = await User.create({username, email, phone, password});
        res.status(200).json({
            message:"Registration Successfull", 
            token : await userCreated.generateToken(),
            userId: userCreated._id.toString()
        })
    } catch (error) {
       res.status(500).json({message:"Internal server error"})
    }
}

// ---------------
//  Login Logic
// ---------------
const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist){
            res.status(400).json({message:"Invalid Credentials"})    
        }
        //const user = await bcrypt.compare(password,userExist.password);
        const user = await userExist.comparePassword(password);
        if(user){
            res.status(200).json({
                message:"Login Successfull", 
                token : await userExist.generateToken(),
                userId: userExist._id.toString()
            })
            //console.log('token=>'.token);
        } else {
            res.status(401).json({message:"Invalid email or password"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
}
// ---------------
//  user info get Logic
// ---------------
const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
        //return user;
    } catch (error) {
        console.log(error);
    }
}



module.exports = {home, register, login,user};