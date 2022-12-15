import Products from "../models/Products.js";
import Users from "../models/Users.js";
import { Op } from "sequelize";

export const getProducts = async (req, res) => {
    try{
        let response;
        if (req.role === 'admin') {
            response = await Products.findAll({
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Products.findAll({
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

export const getProductById = async (req, res) => {
    try{
        const prods = await Products.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!prods) return res.status(404).json({msg:"Data not found"})
        let response;
        if (req.role === 'admin') {
            response = await Products.findOne({

                where:{
                    id: req.params.id
                },
                include:[{
                    model:Users,
                    attributes:['name', 'email']
                }]
            });
        } else {
            response = await Products.findOne({
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

export const createProduct = async (req, res) => {
    const {nama_produk, jenis_produk, harga, deskripsi} = req.body;
    try {
        await Products.create({
            nama_produk:nama_produk,
            jenis_produk:jenis_produk,
            harga:harga,
            deskripsi:deskripsi,
            userId:req.userId
        });
        res.status(201).json({"message": "Product Created"});
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}

export const updateProduct = async (req, res) => {
    try{
        const products = await Products.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!products) return res.status(404).json({msg:"Data not found"})
        const {nama_produk, jenis_produk, harga, deskripsi} = req.body;
        if (req.role === 'admin') {
           await Products.update({nama_produk, jenis_produk, harga, deskripsi},{
                where:{
                    id: products.id
                }
           })
        } else {
            if (req.userId !== products.userId) return res.status(403).json({msg:"Access denied"})
            await Products.update({nama_produk, jenis_produk, harga, deskripsi},{
                where:{
                    [Op.and]:[{id: products.id}, {userId: req.userId}]
                }
           })
        }
        res.status(200).json({msg:"Product updated"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}
 

export const deleteProduct = async (req, res) => {
    try{
        const products = await Products.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!products) return res.status(404).json({msg:"Data not found"})
        const {nama_produk, jenis_produk, harga, deskripsi} = req.body;
        if (req.role === 'admin') {
           await Products.destroy({
                where:{
                    id: products.id
                }
           })
        } else {
            if (req.userId !== products.userId) return res.status(403).json({msg:"Access denied"})
            await Products.destroy({
                where:{
                    [Op.and]:[{id: products.id}, {userId: req.userId}]
                }
           })
        }
        res.status(200).json({msg:"Product deleted"})
    } catch (error) {
        res.status(500).json({msg:error.message})
    }
}