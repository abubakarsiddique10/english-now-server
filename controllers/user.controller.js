const User = require("../models/user.model");
const bcrypt = require('bcryptjs');
const { generateToken } = require("../utils/jwtToken");
const UsersPosts = require("../models/post.model");


module.exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            message: "user is successfully created",
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;
        const user = await User.findOne({ phoneNumber });
        if (!user) {
            return res.status(300).json({
                error: "No user found. please create an account"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                error: "invalid password or phone number"
            })
        }

        const token = generateToken(user);
        res.status(200).json({
            token: token,
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports.getUserProfile = async (req, res) => {
    try {
        const { phoneNumber } = req.decoded;
        const user = await User.findOne({ phoneNumber }, "userName userImgURL phoneNumber");
        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        res.status(401).json({
            error: "helo"
        })
    }


}

module.exports.updateUserProfile = async (req, res) => {
    try {
        const { phoneNumber } = req.params
        const userImgURL = req.file?.filename;
        const { userName } = req.body;
        const updateData = { userName, userImgURL };
        if (!userName) {
            delete updateData.userName
        }
        if (!userImgURL) {
            delete updateData.userImgURL
        }
        const result = await User.updateOne({ phoneNumber: phoneNumber }, { $set: updateData }, { runValidators: true });
        if (result.modifiedCount > 0) {
            const userPostDataUpdate = await UsersPosts.updateMany({ phoneNumber: phoneNumber }, { $set: updateData }, { runValidators: true });
            res.status(200).send({
                status: true,
                message: "Data update successfully"
            })
        }
    } catch (error) {
        res.status(300).send({
            status: false,
            error: "Data is not update"
        })
    }
}

module.exports.isUserExist = async (req, res) => {
    try {
        const { phoneNumber } = req.params;
        const isExist = await User.findOne({ phoneNumber });
        if (isExist) {
            res.send({ status: true })
        } else {
            res.send({ status: false })
        }
    } catch (error) {
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        const { phoneNumber } = req.params
        const { password } = req.body;
        const hashPassword = bcrypt.hashSync(password);
        const updatePassword = await User.updateOne({ phoneNumber: phoneNumber }, { $set: { password: hashPassword } });
        res.status(200).send({ status: true, message: "update successful" })
    } catch (error) {
        res.status(301).send({ status: false, message: "update not successful" })
    }
}

