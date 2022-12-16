import Sampah from "../models/Sampah.js";
import Users from "../models/Users.js";
import { Op } from "sequelize";

export const getSampah = async (req, res) => {
    try{
        let response;
        if (req.role === 'admin' || req.role === 'user') {
            response = await Sampah.findAll({
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        } else if (req.role === 'member') {
            response = await Sampah.findAll({
                where:{userId:req.userId},
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getSampahPrelogin = async (req, res) => {
    try {
        let response;
        response = await Sampah.findAll({
            include:[{
                model:Users,
                attributes:['name', 'email']
            }]
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const getSampahById = async (req, res) => {
    try{
        const sampah = await Sampah.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!sampah) return res.status(404).json({msg:"Data not found"})
        let response;
        if (req.role === 'admin' || req.role === 'user') {
            response = await Sampah.findOne({
                where:{
                    id: req.params.id
                },
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Sampah.findOne({
                where:{
                    id: req.params.id,
                    userId:req.userId
                },
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}

export const createSampah = async (req, res) => {
    const {nama_sampah, 
            jenis_sampah,
            kategori_sampah,
            berat,
            harga,
            deskripsi} = req.body;
    try {
        await Sampah.create({
            nama_sampah:nama_sampah,
            jenis_sampah:jenis_sampah,
            kategori_sampah:kategori_sampah,
            berat:berat,
            harga:harga,
            deskripsi:deskripsi,
            userId:req.userId
        });
        res.status(201).json({"message": "Sampah Created"});
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}

export const updateSampah = async (req, res) => {
    try{
        const sampah = await Sampah.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!sampah) return res.status(404).json({msg:"Data not found"})
        const {nama_sampah, 
            jenis_sampah,
            kategori_sampah,
            berat,
            harga,
            deskripsi} = req.body;
        if (req.role === 'admin') {
           await Sampah.update({nama_sampah, jenis_sampah, kategori_sampah, berat, harga, deskripsi},{
                where:{
                    id: sampah.id
                }
           })
        } else {
            if (req.userId !== sampah.userId) return res.status(403).json({msg:"Access denied"})
            await Sampah.update({nama_sampah, jenis_sampah, kategori_sampah, berat, harga, deskripsi},{
                where:{
                    [Op.and]:[{id: sampah.id}, {userId: req.userId}]
                }
           })
        }
        res.status(200).json({msg:"Sampah updated"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
 

export const deleteSampah = async (req, res) => {
    try{
        const sampah = await Sampah.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!sampah) return res.status(404).json({msg:"Data not found"})
        const {nama_sampah, 
            jenis_sampah,
            kategori_sampah,
            berat,
            harga,
            deskripsi} = req.body;
        if (req.role === 'admin') {
           await Sampah.destroy({
                where:{
                    id: sampah.id
                }
           })
        } else {
            if (req.userId !== sampah.userId) return res.status(403).json({msg:"Access denied"})
            await Sampah.destroy({
                where:{
                    [Op.and]:[{id: sampah.id}, {userId: req.userId}]
                }
           })
        }
        res.status(200).json({msg:"Sampah deleted"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}