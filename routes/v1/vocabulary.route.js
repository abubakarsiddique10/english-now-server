const express = require('express');
const vocabularyController = require('../../controllers/vocabulary.controllers');
const { vocabularyImgUpload } = require('../../middleware/multer');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();


// POST METHODS / VOCABULARY CREATE AND UPDATE
router.route('/').put(vocabularyImgUpload.single('image'), vocabularyController.createVocabulary);

// GET METHODS / GET VOCABULARY
router.route('/:category').get(vocabularyController.getVocabulary)

module.exports = router