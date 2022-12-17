const express = require('express');
const cors = require('cors')
const db = require('./config/database.js')
const SequelizeStore = require('connect-session-sequelize')
const router = require("./route/Route.js")
const session = require("express-session");
const cookieParser = require("cookie-parser");

require('dotenv').config();

// Init express
const app = express();
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db:db
});
// use express json
app.use(express.json());
// use cors
app.use(cors({
    credentials:true,
    origin:'http://192.168.100.4:3000'
}));


// (async()=>{
//     await db.sync({force:true});
// })()


app.use(session({
    secret:'4903hjr93yuufy90rawr0309urfehfy89yftj3pm3k3fjeihf',
    resave:false,
    saveUninitialized:true,
    store:store,
    cookie: {
        secure: 'auto'
    }
}));
app.use(cookieParser());
 
// Testing database connection 
try {
    db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


// use router
app.use(router);
 
// listen on port
app.listen(5000, () => console.log('API serve at http://localhost:5000/'));