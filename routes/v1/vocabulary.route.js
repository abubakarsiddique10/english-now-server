const express = require('express');
const vocabularyController = require('../../controllers/vocabulary.controllers');
const { vocabularyImgUpload } = require('../../middleware/multer');
const router = express.Router();


// vocabulary related router
router.route('/').put(vocabularyImgUpload.single('image'), vocabularyController.createVocabulary);
router.route('/:category').get(vocabularyController.getVocabulary)

module.exports = router