import { Pembukuan } from "../models/Pembukuan.js";

export const getPembukuan = async (req, res) => {
    try{ 
        const produk = await Pembukuan.findAll();
        res.json(produk)
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