const jwt = require("jsonwebtoken");
const { promisify } = require('util')


module.exports.verifyToken = async (req, res, next) => {
    try {
        const accessToken = req.headers?.authorization?.split(' ')[1];
        if (accessToken === "null") {
            return res.status(403).send({ error: "You are not logged in!" })
        }
        const decoded = await promisify(jwt.verify)(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded
        next()

    } catch (error) {
        res.status(401).send({
            error: "invalid token"
        })
    }

}