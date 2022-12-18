const Users = require("../models/Users.js");
const md5 = require('md5')

const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes:['id','uuid','name','email','role']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const getUserById = async (req, res) => {
    try {
        const response = await Users.findOne({
            where:{
                uuid: req.params.id
            },
            attributes:['uuid','name','email','role']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

const createUser = async (req, res) => {
    const {name, email, password, confPassword, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg:"Password and Confirm Password not match"})
    const hashPassword = md5(password);
    try {
        await Users.create({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        })
        res.status(201).json({msg:"User created"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const updateUser = async (req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        },
    })
    if (!user) return res.status(404).json({msg:"User not found"})
    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password
    } else {
        hashPassword = md5(password)
    }
    if (password !== confPassword) return res.status(400).json({msg:"Password and Confirm Password not match"})
    try {
        await Users.update({
            name:name,
            email:email,
            password:hashPassword,
            role:role
        },{
            where:{
                id:user.uuid
            }
        })
        res.status(200).json({msg:"User updated"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const deleteUser = async (req, res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        },
    })
    if (!user) return res.status(404).json({msg:"User not found"})
    try {
        await Users.destroy({
            where:{
                id:user.id
            }
        })
        res.status(200).json({msg:"User deleted"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}