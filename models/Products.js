import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./Users.js";

// Init datatypes
const { DataTypes } = Sequelize;

// Buat skema data
const Products = db.define('produk', {
    nama_produk: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    jenis_produk: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    deskripsi: {
        type: DataTypes.TEXT,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
}, {
    freezeTableName: true,
    timestamps: false
})

Users.hasMany(Products);
Products.belongsTo(Users)

// Export Skema
export default Products