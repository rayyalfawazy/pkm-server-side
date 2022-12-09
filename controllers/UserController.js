import Users from "../models/Users.js";
import md5 from "md5";

export const getUsers = async (req, res) => {
    try{ 
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const createUser = async (req, res) => {
    const {name, username, password, confPassword} = req.body;
    if ( password !== confPassword ) return res.status(400).json({message:"Password not match"});
    const hashPassword = md5(password)
    try {
        await Users.create({
            name:name,
            username:username,
            password:hashPassword
        });
        res.status(201).json({message:"User Created"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}