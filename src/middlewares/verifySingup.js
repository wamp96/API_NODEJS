import User from "../models/User.js";
import {ROLES} from "../models/User.js";



export const checkExistingUser = async (res,req,next) =>{
    try {
        const userFound = await User.findOne({username: req.body,username});
        if(userFound)
            return res.status(400).json({message: "User already exists"});
        
        const email = await User.findOne({email: req.body.email});
        if(email)
            return res.status(400).json({message: "Email already exists"});
        next();
    } catch (error) {
        return res.status(500).json({message: "Email already exists"});
    }
};

export const checkExistingRole = (req,res,next) => {
    req.body.roles.find();

    if(!req.body.roles) return res.status(404).json({message : "No roles"});

    for (let i = 0; i < req.body.roles.length; i++){
        if(!ROLES.includes(req.body.roles[i])){
            return res.status(400).json({
                message: 'Role ${req.body.roles[i]} does not exist',
            });
        }
    }
    next();
};