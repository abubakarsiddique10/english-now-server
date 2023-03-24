const express = require('express');
const { createUserPost, getAllUserPost, getUserPosts, addComment, updateLikeCount } = require('../../controllers/post.controllers');
const { postImgUpload } = require('../../middleware/multer');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();


router.route('/').post(postImgUpload.single('postImgURL'), createUserPost)
router.route('/:id').patch(addComment);
router.route('/like/:postId').patch(updateLikeCount);

router.route('/').get(getAllUserPost)
router.route('/:phoneNumber').get(verifyToken, getUserPosts)

module.exports = router