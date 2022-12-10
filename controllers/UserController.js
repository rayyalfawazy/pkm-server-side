import Users from "../models/Users.js";
import md5 from "md5";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

export const getUsers = async (req, res) => {
    try{ 
        const users = await Users.findAll({attributes:['id','name','username']});
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

export const loginUser = async(req, res) => {
    try {
        const user = await Users.findAll({
            where:{
                username:req.body.username
            }
        })
        if (md5(req.body.password) === user[0].password) {
            const userId = user[0].id
            const name = user[0]
            const username = user[0].username
            const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            const refreshToken = jwt.sign({userId, name, username}, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            await Users.update({refresh_token:refreshToken}, {
                where:{
                    id:userId
                }
            })
            res.cookie('refreshToken', refreshToken, {
                httpOnly:true,
                maxAge: 24 * 60 * 60 * 1000
            })
            res.json({accessToken})
        } else {
            res.status(403).json({message:"Wrong password"})
        }
    } catch (error) {
        console.log(process.env)
        res.status(404).json(
            {
                message:'Username not found', 
            }
        )
    }
}