// import sequelize
const Sequelize = require('sequelize')
require('dotenv').config()

// create connection
const db = new Sequelize(process.env.REMOTE_DB_NAME, process.env.REMOTE_DB_USERNAME, process.env.REMOTE_DB_PASSWORD, {
    host: process.env.REMOTE_DB_HOST,
    dialect: 'mysql'
});

// export connection
module.exports = db