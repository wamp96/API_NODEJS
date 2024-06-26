import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
import {SECRET} from "../config.js";

export const signupHandler = async (req, res) =>{
    try{
        const {username,email,password,roles} = req.body;

        const newUser = new User({
            username,
            email,
            password
        });

        if(roles){
            const foundRoles = await Role.find({name: {$in: roles}});
            newUser.roles = foundRoles.map(role => role._id);
        }else{
            const role = await Role.findOne({name: {$in: roles}});
            newUser.roles = [role._id];
        }

        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, SECRET, {expiresIn: 86400,});
        res.status(201).json({token});

    }catch(error){
        return res.status(500).json(error.message);
    }
};


export const signinHandler = async (req, res) =>{

    try{
        const userFound = await User.findOne({email: req.body.email}).populate("roles");

        if(!userFound){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await User.comparePassword(req.body.password,userFound.password);

        if(!matchPassword){
            return res.status(401).json({message: "Invalid password"});
        }

        const token = jwt.sign({id: userFound._id}, SECRET, {expiresIn: 86400,});
        res.json({token});
    }catch(error){
        console.log(error);
    }





};