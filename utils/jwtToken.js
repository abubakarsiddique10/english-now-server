const jwt = require("jsonwebtoken")


module.exports.generateToken = (user) => {
    const payload = {
        phoneNumber: user.phoneNumber,
    }
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    return token

}