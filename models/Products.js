import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Init datatypes
const { DataTypes } = Sequelize;

// Buat skema data
const Products = db.define('produk', {
    nama_produk: {
        type: DataTypes.STRING
    },
    jenis_produk: {
        type: DataTypes.STRING
    },
    harga: {
        type: DataTypes.INTEGER
    },
    deskripsi: {
        type: DataTypes.TEXT
    }
}, {
    freezeTableName: true,
    timestamps: false
})

// Export Skema
export default Products