import Users from "../models/Users.js";
import bcrypt from "bcrypt"

export const getUsers = async (req, res) => {
    try{ 
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    const {name, username, password, confPassword} = req.body
    if ( password !== confPassword ) return res.status(400).json({message:"Password not match"})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name:name,
            username:username,
            password:hashPassword
        })
        res.json({message:"User Created"})
    } catch (error) {
        console.log(error)
    }
}