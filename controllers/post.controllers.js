const UsersPosts = require("../models/post.model");

module.exports.createUserPost = async (req, res) => {
    try {
        const postImgURL = req.file?.filename;
        const userPost = req.body;
        const createPost = { ...userPost, postImgURL };
        const post = await UsersPosts.create(createPost);
        res.status(200).send({ status: true, post, message: "Post Successful", })
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
        const decodedNumber = req.decoded?.phoneNumber;
        const { phoneNumber } = req.params
        if (decodedNumber === phoneNumber) {
            const getUserPosts = await UsersPosts.find({ phoneNumber: phoneNumber });
            res.status(200).send({
                message: "posts successfully loaded",
                posts: getUserPosts,
            })
        }
    } catch (error) {
        res.status(401).send({
            message: "posts loaded fial",
            error: error.message
        })
    }
}

module.exports.addComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = req.body;
        const addedComment = await UsersPosts.findOneAndUpdate({ _id: id }, { $push: { 'comments': comment } }, { new: true })
        res.status(200).send({ status: true, comments: addedComment.comments, id: addedComment._id })
    } catch (error) {
        res.status(301).send({ status: false })
    }
}

module.exports.updateLikeCount = async (req, res) => {
    try {
        const { postId } = req.params;
        const { userId } = req.body;

        const existId = await UsersPosts.find({ $and: [{ _id: postId }, { likes: userId }] });

        if (existId.length) {
            return res.send({ status: false, message: "You have already liked this post" })
        }

        const updateLike = await UsersPosts.findOneAndUpdate({ _id: postId }, { $push: { 'likes': userId } }, { new: true });
        res.status(200).send({ status: true, likes: updateLike.likes, id: updateLike._id })

    } catch (error) {
        res.status(301).send({ status: false })
    }
}