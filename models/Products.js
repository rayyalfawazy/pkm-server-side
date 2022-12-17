const Sequelize = require("sequelize");
const db = require("../config/database.js");
const Users = require("./Users.js");

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
module.exports = Products