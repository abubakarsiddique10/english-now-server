const multer = require('multer');
const bcrypt = require('bcryptjs');


// vocabular add for configuration
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
module.exports.vocabularyImgUpload = multer({
    storage: vocabularyImgStorage,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error('Only .png .jpg .jpeg format allowed!'));
        }
    }
})


// user profile update for configuration
const avaterImgStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'assets/avater')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname.toLocaleLowerCase();
        cb(null, fileName)
    }
})
module.exports.avaterImgUpload = multer({
    storage: avaterImgStorage,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error('Only .png .jpg .jpeg format allowed!'));
        }
    }
})


// user post for configuration
const postImgStorage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'assets/usersPostImage')
    },
    filename: function (req, file, cb) {
        const fileName = Date.now() + "-" + file.originalname.toLocaleLowerCase();
        cb(null, fileName)
    }
})
module.exports.postImgUpload = multer({
    storage: postImgStorage,
    limits: {
        fileSize: 500000
    },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg") {
            cb(null, true)
        } else {
            cb(new Error('Only .png .jpg .jpeg format allowed!'));
        }
    }
})

