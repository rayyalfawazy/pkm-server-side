const express = require('express');
const cors = require('cors')
const db = require('./config/database.js')
const SequelizeStore = require('connect-session-sequelize')
const router = require("./route/Route.js")
const session = require("express-session");
const cookieParser = require("cookie-parser");
const FileUpload = require('express-fileupload');

require('dotenv').config();

// Init express
const app = express();

// use express json
app.use(express.json());

// use express fileupload and static file
app.use(FileUpload())
app.use(express.static('public'))

// use cors
app.use(cors({
    credentials:true,
    origin:process.env.ORIGIN_SITE
}));


// (async()=>{
//     await db.sync({force:true});
// })()

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});



app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cookieParser());
 

try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


// use router
app.use(router);
 
// listen on port
app.listen(process.env.APP_PORT, () => {
    console.log(`API serve at http://localhost:${process.env.APP_PORT}/`)
});