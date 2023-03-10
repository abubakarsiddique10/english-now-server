const mongoose = require('mongoose');

const vocabularySchema = mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please provide a category"],
        unique: true,
    },
    vocabulary: [{
        word: {
            type: String,
            required: [true, "Please provide a word"],
            trim: true,
            unique: true
        },
        meaning: {
            type: String,
            required: [true, "Please provide a meaning"],
            trim: true,
            unique: true
        },
        image: {
            type: String,
            required: [true, "Please provide a image"],
            trim: true,
            unique: true,
        },
        synonym: {
            type: String,
            trim: true,
        },
        antonym: {
            type: String,
            trim: true
        },
        sentence: {
            type: String,
            trim: true
        }
    }]

})

const Vocabulary = mongoose.model('vocabulary', vocabularySchema);
module.exports = Vocabulary