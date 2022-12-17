const Sequelize = require('sequelize')
const db = require("../config/database.js");

// Init datatypes
const { DataTypes } = Sequelize;

const Pembukuan = db.define('pembukuan', {
    nama_member: {
        type: DataTypes.STRING
    },
    tanggal_penjualan: {
        type: DataTypes.DATEONLY
    },
    total_penjualan: {
        type: DataTypes.INTEGER
    },
    kategori_penjualan: {
        type: DataTypes.STRING
    },
    jenis_sampah: {
        type: DataTypes.STRING
    }
},{
    freezeTableName: true,
    timestamps:false
})

module.exports = Pembukuan