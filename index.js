import express from "express";
import cors from "cors";
import db from "./config/database.js";
import router from "./route/Route.js";

// Init express
const app = express();
// use express json
app.use(express.json());
// use cors
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}));
 
// Testing database connection 
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
 
// use router
app.use(router);
 
// listen on port
app.listen(5000, () => console.log('API serve at http://localhost:5000/'));