import { Sequelize } from "sequelize";
import db from "../config/database.js";
import bcrypt from 'bcrypt'

// Init datatypes
const { DataTypes } = Sequelize;

const Users = db.define('users', {
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
}, {
    freezeTableName: true,
    timestamps: false,
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(8))
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password)
        }
    }
})

export default Users