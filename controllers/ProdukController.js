import Products from "../models/Products.js";

export const getProducts = async (req, res) => {
    try{ 
        const produk = await Products.findAll();
        res.json(produk)
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Products.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(product[0]);
    } catch (err) {
        console.log(err);
    }
}

export const createProduct = async (req, res) => {
    try {
        await Products.create(req.body);
        res.json({
            "message": "Product Created"
        });
    } catch (err) {
        console.log(err);
    }
}

export const updateProduct = async (req, res) => {
    try {
        await Products.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 

export const deleteProduct = async (req, res) => {
    try {
        await Products.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Deleted"
        });
    } catch (err) {
        console.log(err);
    }
}