const Vocabulary = require("../models/vocabulary.model");


// vocabulary post and update congroller
module.exports.createVocabulary = async (req, res) => {
    try {
        // save vocabulary with category
        const image = req.file?.filename;
        const category = req.body.category
        const vocabulary = { category: category, vocabulary: [{ ...req.body, image }] };
        delete vocabulary.vocabulary[0].category;

        // save only vocabulary
        const updateVocabulary = { ...req.body, image }
        delete updateVocabulary.category;
        const saveVocabulary = await Vocabulary.updateOne({ category: category }, { $push: { "vocabulary": updateVocabulary } }, { runValidators: true, });

        if (saveVocabulary.modifiedCount) {
            res.status(200).send({
                status: true,
                message: "Vocabulary update successfully",
            })
        }
        else if (!saveVocabulary.matchedCount) {
            const result = await Vocabulary.create(vocabulary);
            res.status(200).json({
                status: true,
                message: "vacabulary & category inserted successfully",
            })
        }
    } catch (error) {
        res.status(400).send({
            status: false,
            message: "Data not inserted",
            error: error.message
        })
    }
}


// get vocabulary controller
module.exports.getVocabulary = async (req, res) => {
    try {
        const { category } = req.params;
        const vocabularies = await Vocabulary.find({ category: category }, { vocabulary: { synonym: 0, antonym: 0, sentence: 0 }, _id: 0 });
        const vocabulary = vocabularies[0]?.vocabulary;

        res.status(200).send({
            status: "success",
            data: vocabulary,
            message: "data get success"
        })
    }
    catch (error) {
        res.status(401).send({
            status: "failed",
            message: "get not successfully",
            message: error
        })
    }
}