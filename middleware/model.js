const mongoose = require('mongoose')

const snakeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    color: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    firstAid: {
        type: String,
        required: true,
    },
    headShape: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    otherName: {
        type: String,
        required: true,
    },
    pattern: {
        type: String,
        required: true,
    },
    scientificName: {
        type: String,
        required: true,
    },
    venomLevel: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("Snake", snakeSchema)