import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Users from "./Users.js";

// Init datatypes
const { DataTypes } = Sequelize;

// Buat skema data
const Sampah = db.define('sampah', {
    nama_sampah: {
        type: DataTypes.STRING
    },
    jenis_sampah: {
        type: DataTypes.STRING
    },
    kategori_sampah: {
        type: DataTypes.STRING
    },
    berat: {
        type: DataTypes.INTEGER
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

Users.hasMany(Sampah);
Sampah.belongsTo(Users)

// Export Skema
export default Sampah