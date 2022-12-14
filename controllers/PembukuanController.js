import { Pembukuan } from "../models/Pembukuan.js";
import { Op } from "sequelize";

export const getPembukuan = async (req, res) => {
    try{ 
        const pembukuan = await Pembukuan.findAll();
        res.json(pembukuan)
    } catch (error) {
        console.log(error)
    }
}

export const searchPembukuan = async (req, res) => {
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

export const getPembukuanById = async (req, res) => {
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


export const createPembukuan = async (req, res) => {
    try {
        await Pembukuan.create(req.body);
        res.json({
            "message": "Pembukuan Created"
        });
    } catch (err) {
        console.log(err);
    }
}

export const updatePembukuan = async (req, res) => {
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
 

export const deletePembukuan = async (req, res) => {
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