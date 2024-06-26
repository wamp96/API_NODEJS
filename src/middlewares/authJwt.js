import jwt from "jsonwebtoken";
import { SECRET } from "../config";
import User from "../models/User.js";
import Role from "../models/Role.js";


export const verifyTokem = async (req, res, next) => {
    let tokem = req.headers["x-access-token"];

    if(!token)return res.status(403).json({message: "No tokem provided"});

    try {
        const decoded = jwt.verify(tokem, SECRET);
        req.userId = decoded.id;
        
        const user = await User.findById(req.userId,{password:0});
        if(!user) return res.status(404).json({message: "No user found"});
   
        next();
    } catch (error) {
        return res.status(401).json({message: "Invalid tokem"});
    }
};

export const isModerator = async(req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const role = await Role.find({_id:{$in: user.roles}});
        for(let i=0; i< roles.length;i++){
            if(roles[i].name === "moderator"){
                next();
                return;
            }
        }
        return res.status(403).json({message: "User is not moderator"});
    } catch (error) {
        return res.status(500).json({message: error});
    }

};

export const isAdmin = async(req,res,next) =>{
    try {
        const user = await User.findById(req.userId);
        const role = await Role.find({_id:{$in: user.roles}});
        for(let i=0; i< roles.length;i++){
            if(roles[i].name === "admin"){
                next();
                return;
            }
        }
        return res.status(403).json({message: "User is not moderator"});
    } catch (error) {
        return res.status(500).json({message: error});
    }

};