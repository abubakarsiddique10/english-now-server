const multer = require('multer');
const bcrypt = require('bcryptjs');

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


const avaterImgStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'assets/avater')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName)
    }
})
module.exports.avaterImgUpload = multer({ storage: avaterImgStorage })

const postImgStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'assets/usersPostImage')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname;
        cb(null, fileName)
    }
})
module.exports.postImgUpload = multer({ storage: postImgStorage })

