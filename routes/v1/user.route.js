const express = require('express');
const userController = require('../../controllers/user.controller');
const { avaterImgUpload } = require('../../middleware/multer');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();


//POST METHODS | SIGNUP AND LOGIN
router.route('/signup').post(userController.createUser);
router.route('/login').post(userController.loginUser)
router.route('/checkUser/:phoneNumber').get(userController.checkUser)

// GET METHODS / USER VERYFICATION
router.route('/profile').get(verifyToken, userController.getUserProfile)

// PATCH METHOD / USER PROFILE UPDATE
router.route('/updateProfile/:phoneNumber').patch(avaterImgUpload.single('imageURL'), userController.updateUserProfile)

module.exports = router;