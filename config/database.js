// import sequelize
const Sequelize = require('sequelize')
require('dotenv').config()

// create connection
const db = new Sequelize(process.env.LOCAL_DB_NAME, process.env.LOCAL_DB_USERNAME, process.env.LOCAL_DB_PASSWORD, {
    host: process.env.LOCAL_DB_HOST,
    dialect: 'mysql'
});

// export connection
module.exports = db