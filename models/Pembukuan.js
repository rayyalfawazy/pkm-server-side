const Sequelize = require('sequelize')
const db = require("../config/database.js");
const Users = require("./Users.js");

// Init datatypes
const { DataTypes } = Sequelize;

const Pembukuan = db.define('pembukuan', {
    tanggal_penjualan: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    total_penjualan: {
        type: DataTypes.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    kategori_penjualan: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
    jenis_sampah: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    }
},{
    freezeTableName: true,
    timestamps:false
})

Users.hasMany(Pembukuan);
Pembukuan.belongsTo(Users);

module.exports = Pembukuan