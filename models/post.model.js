const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    userName: {
        type: String,
    },
    userImgURL: {
        type: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        require: [true, 'Please provide content'],
        trim: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    comments: {
        type: Array,
        default: []
    },
    postImgURL: {
        type: String,
        trim: true
    },

}, { timestamps: true })
const UsersPosts = mongoose.model('usersPost', postSchema);
module.exports = UsersPosts