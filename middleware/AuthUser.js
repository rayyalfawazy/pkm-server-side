import Users from "../models/Users.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg:"Mohon login terlebih dahulu"})
    }
    const user = await Users.findOne({
        where:{
            uuid: req.session.userId
        },
    })
    if (!user) return res.status(404).json({msg:"User not found"});
    req.userId = user.id;
    req.role = user.role;
    next()
}