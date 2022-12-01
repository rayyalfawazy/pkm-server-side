import Sampah from "../models/Sampah.js";

export const getSampah = async (req, res) => {
    try{ 
        const sampah = await Sampah.findAll();
        res.json(sampah)
    } catch (error) {
        console.log(error)
    }
}

export const getSampahById = async (req, res) => {
    try {
        const product = await Sampah.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

export const createSampah = async (req, res) => {
    try {
        await Sampah.create(req.body);
        res.json({
            "message": "Sampah Created"
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateSampah = async (req, res) => {
    try {
        await Sampah.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Sampah Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 

export const deleteProduct = async (req, res) => {
    try {
        await Sampah.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Sampah Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}