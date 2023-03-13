const express = require('express');
const { createUserPost, getAllUserPost, getUserPosts } = require('../../controllers/post.controllers');
const { postImgUpload } = require('../../middleware/multer');
const router = express.Router();


router.route('/').post(postImgUpload.single('postImgURL'), createUserPost)

router.route('/').get(getAllUserPost)
router.route('/:phoneNumber').get(getUserPosts)

module.exports = router