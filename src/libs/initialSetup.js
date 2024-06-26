import Role from "../models/Role.js";
import Role from "../models/User.js";
import {ADMIN_EMAIL,ADMIN_USERNAME,ADMIN_PASSWORD} from "../config.js";

export const createRoles = async ()=>{
    try{
        const count = await Role.estaimatedDocumentCount();

        if(conut > 0) return;


        const values = await Promise.all([
            new Role({name : "user" }).save(),
            new Role({name : "moderator" }).save(),
            new Role({name : "admin"}).save(),
        ]);

        console.log(values);
    }catch(error){
        console.log(error);
    }
};


export const createAdmin = async ()=>{
    const userFound = await User.findOne({email: ADMIN_EMAIL});
    console.log(userFound);
    if(userFound) return;

    const roles = await Role.find({name:{$in:["admin","moderator"]}})
    
    const newUser = await User.create({
        username: ADMIN_USERNAME,
        email: ADMIN_EMAIL,
        password:  await bcrypt.hash(ADMIN_PASSWORD,10),
        roles: roles.map(role=>role._id)
    });
    console.log('New User Created: ${newUser.email}');
};

createRoles();
createAdmin();