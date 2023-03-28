const express = require('express');
const userController = require('../../controllers/user.controller');
const { avaterImgUpload } = require('../../middleware/multer');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();


//POST METHODS | SIGNUP AND LOGIN
router.route('/signup').post(userController.createUser);
router.route('/login').post(userController.loginUser)

// GET METHODS / USER VERYFICATION
router.route('/profile').get(verifyToken, userController.getUserProfile)

// PATCH METHOD / USER PROFILE UPDATE
router.route('/updateProfile/:phoneNumber').patch(avaterImgUpload.single('imageURL'), userController.updateUserProfile);

// RESET PASSWORD
router.route('/resetPassword/:phoneNumber').patch(userController.resetPassword)

// USER CHECKED
router.route('/isUserExist/:phoneNumber').get(userController.isUserExist)


module.exports = router;