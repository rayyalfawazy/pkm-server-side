const { Pembukuan } = require("../models/Pembukuan.js");
const { Op } = require("sequelize");

const getPembukuan = async (req, res) => {
    try{ 
        const pembukuan = await Pembukuan.findAll();
        res.json(pembukuan)
    } catch (error) {
        console.log(error)
    }
}

const searchPembukuan = async (req, res) => {
    try{ 
        const pembukuan = await Pembukuan.findAll({
            where:{
                nama_member:{
                    [Op.like]:`%${req.query.search}%`
                }
            }
        });
        res.json(pembukuan)
    } catch (error) {
        console.log(error)
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