const Sampah = require("../models/Sampah.js");
const Users = require("../models/Users.js");
const { Op, json } = require('sequelize');
const path = require('path')
const fs = require('fs')

const getSampah = async (req, res) => {
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

const getSampahPrelogin = async (req, res) => {
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

const getSampahById = async (req, res) => {
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

const createSampah = async (req, res) => {
    if (req.files === null) return res.status(400).json({msg:"No file uploaded"});
    const {nama_sampah, 
            jenis_sampah,
            kategori_sampah,
            berat,
            harga,
            deskripsi} = req.body;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`
    const allowedType = ['.png', '.jpg', '.jpeg']

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid images", ext: ext}); // if image has a wrong extensions
    if (fileSize > 5000000) return res.status(422).json({msg:"Image must less than 5MB"}); // if more than 5MB

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({msg:err.message})
        try {
            await Sampah.create({
                nama_sampah:nama_sampah,
                jenis_sampah:jenis_sampah,
                kategori_sampah:kategori_sampah,
                berat:berat,
                harga:harga,
                deskripsi:deskripsi,
                userId:req.userId,
                image: fileName,
                url : url
            });
            res.status(201).json({"message": "Sampah Created with Image"});
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    })
}

const updateSampah = async (req, res) => {
    const sampah = await Sampah.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!sampah) return res.status(404).json({msg:"Data not found"})
    let fileName = "";
    if (req.file === null) {
        fileName = Sampah.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg']

        // Image Validation
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg:"Invalid images", ext: ext}); // if image has a wrong extensions
        if (fileSize > 5000000) return res.status(422).json({msg:"Image must less than 5MB"}); // if more than 5MB

        // Image Replacement
        const filePath = `./public/images/${sampah.image}`;
        fs.unlinkSync(filePath)

        file.mv(`./public/images/${fileName}`, (err) => {
            if (err) return res.status(500).json({msg:err.message})
        })
    }
    const {nama_sampah, 
        jenis_sampah,
        kategori_sampah,
        berat,
        harga,
        deskripsi} = req.body;
    const url = `${req.protocol}://${req.get('host')}/images/${fileName}`
    const image = fileName

    try{
        if (req.role === 'admin') {
           await Sampah.update({nama_sampah, jenis_sampah, kategori_sampah, berat, harga, deskripsi, image, url},{
                where:{
                    id: sampah.id
                }
           })
        } else {
            if (req.userId !== sampah.userId) return res.status(403).json({msg:"Access denied"})
            await Sampah.update({nama_sampah, jenis_sampah, kategori_sampah, berat, harga, deskripsi, image, url},{
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
 

const deleteSampah = async (req, res) => {
    const sampah = await Sampah.findOne({
        where:{
            id: req.params.id
        }
    });
    if(!sampah) return res.status(404).json({msg:"Data not found"})
    const filePath = `./public/images/${sampah.image}`;
    try{
        if (req.role === 'admin') {
            fs.unlinkSync(filePath)
            await Sampah.destroy({
                    where:{
                        id: sampah.id
                    }
            })
        } else {
            if (req.userId !== sampah.userId) return res.status(403).json({msg:"Access denied"})
            fs.unlink(filePath)
            await Sampah.destroy({
                where:{
                    [Op.and]:[{id: sampah.id}, {userId: req.userId}]
                }
           })
        }
        res.status(200).json({msg:"Sampah deleted"})
    } catch (error) {
        res.status(500).json({msg:error.message, fp:filePath, id:{req:Number(req.params.id), sampah:sampah.id }})
    }
}

module.exports = {
    getSampah,
    getSampahById,
    getSampahPrelogin,
    createSampah,
    updateSampah,
    deleteSampah
}