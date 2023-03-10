const express = require('express');
const { savePost } = require('../../controllers/post.controllers');
const router = express.Router();


router.get('/:category', savePost);

module.exports = router