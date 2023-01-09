const Pembukuan = require("../models/Pembukuan.js");
const Users = require("../models/Users.js");
const { Op } = require("sequelize");

const getPembukuan = async (req, res) => {
    try{
        let response;
        if (req.role === 'admin' || req.role === 'user') {
            response = await Pembukuan.findAll({
                where:{
                    nama_member:{
                        [Op.like]:`%${req.query.search}%`
                    }
                },
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Pembukuan.findAll({
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

const searchPembukuan = async (req, res) => {
    try{
        let response;
        if (req.role === 'admin') {
            response = await Pembukuan.findAll({
                include:[{
                    model:Users,
                    attributes:['name', 'email'],
                    where:{
                        name:{
                            [Op.like]:`%${req.query.search}%`
                        }
                    }
                }]
            });
        } else {
            response = await Pembukuan.findAll({
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

const getPembukuanById = async (req, res) => {
    try{ 
        const produk = await Pembukuan.findOne({
            where:{
                id:req.params.id
            }
        });
        res.json(produk)
    } catch (error) {
        console.log(error)
    }
}


const createPembukuan = async (req, res) => {
    try {
        await Pembukuan.create(req.body);
        res.json({
            "message": "Pembukuan Created"
        });
    } catch (err) {
        console.log(err);
    }
}

const updatePembukuan = async (req, res) => {
    try {
        await Pembukuan.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Pembukuan Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 

const deletePembukuan = async (req, res) => {
    try {
        await Pembukuan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Pembukuan Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    getPembukuan,
    searchPembukuan,
    getPembukuanById,
    createPembukuan,
    updatePembukuan,
    deletePembukuan
}