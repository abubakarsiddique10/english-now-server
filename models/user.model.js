const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Name is required'],
        minLength: [3, 'Your name needs to be between 3 and 25 characters'],
        maxLength: [25, 'Your name needs to be between 3 and 25 characters'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        unique: [true, 'user already exist'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Your password needs to be between 5 and 15 characters'],
        maxLength: [15, 'Your password needs to be between 5 and 15 characters'],
        trim: true
    },
    userImgURL: String
}, { timestamps: true })

userSchema.pre('save', function (next) {
    const hashPassword = bcrypt.hashSync(this.password);
    this.password = hashPassword,
        next()
})

const User = mongoose.model('user', userSchema);
module.exports = User;