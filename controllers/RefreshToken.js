import Users from '../models/Users.js';
import jwt from 'jsonwebtoken'

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        const user = await Users.findAll();
        let compare = false
        if (refreshToken === user[0].refresh_token) {
            compare = true
        }
        res.json({dbrt:user[0].refresh_token, rt: refreshToken, comparison: compare})
        // if (!user[0]) return res.sendStatus(403)
        // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        //     if (error) return res.sendStatus(403);
        //     const userId = user[0].id
        //     const name = user[0].name
        //     const username = user[0].username
        //     const accessToken = jwt.sign({userId, name, username}, process.env.ACCESS_TOKEN_SECRET, {
        //         expiresIn:'15s'
        //     });
        //     res.json({ accessToken })
        // });
    } catch (error) {
        console.log(error)
    }
}