const express = require('express');
const userController = require('../../controllers/user.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();


// user router
router.route('/signup').post(userController.createUser);
router.route('/login').post(userController.loginUser)
router.route('/profile').get(verifyToken, userController.getUserProfile)

module.exports = router;