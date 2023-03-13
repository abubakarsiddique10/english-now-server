const UsersPosts = require("../models/post.model");

module.exports.createUserPost = async (req, res) => {
    try {
        const postImgURL = req.file?.filename;
        const userPost = req.body;
        const createPost = { ...userPost, comments: [], postImgURL };
        const result = await UsersPosts.create(createPost);
        res.status(200).send({ message: "Post Successful" })
    } catch (error) {
        res.status(401).send({ error: error })
    }

}

module.exports.getAllUserPost = async (req, res) => {
    try {
        const getAllUserPosts = await UsersPosts.find({});
        res.status(200).send({
            message: "posts successfully loaded",
            posts: getAllUserPosts,
        })
    } catch (error) {
        res.status(401).send({
            message: "posts loaded fial",
            error: error.message
        })
    }
}

module.exports.getUserPosts = async (req, res) => {
    try {
        const { phoneNumber } = req.params
        const getAllUserPosts = await UsersPosts.find({ phoneNumber: phoneNumber });
        res.status(200).send({
            message: "posts successfully loaded",
            posts: getAllUserPosts,
        })
    } catch (error) {
        res.status(401).send({
            message: "posts loaded fial",
            error: error.message
        })
    }
}