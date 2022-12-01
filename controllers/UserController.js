import Users from "../models/Users.js";

export const getUsers = async (req, res) => {
    try{ 
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (req, res) => {
    try {
        await Users.create(req.body);
        res.json({
            "message": "User Created"
        });
    } catch (err) {
        console.log(err);
    }
}