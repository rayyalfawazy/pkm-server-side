import { Sequelize } from "sequelize";
import db from "../config/database.js";

// Init datatypes
const { DataTypes } = Sequelize;

const Users = db.define('users', {
    name: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    refresh_token: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false,
})

export default Users