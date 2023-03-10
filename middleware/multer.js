const multer = require('multer');

const vocabularyImgStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const category = req.body.category;
        cb(null, `assets/vocabulary/${category}`)
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName)
    }
});
module.exports.vocabularyImgUpload = multer({ storage: vocabularyImgStorage })
