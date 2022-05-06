const res = require('express/lib/response')
const mongoose = require('mongoose')
const Snake = require('./model')

exports.getSnakes = (req, res, next) => {
    console.log("Getting all snakes from database") // TODO : Remove
    Snake.find()
    .select("_id color description firstAid headShape image name otherName pattern scientificName venomLevel")
    .exec()
    .then(data => {
        res.status(200).json({
            snakes: data
        })
    })
    .catch(err => {
        res.status(500).json({
            error: "unable to fetch data from database"
        })
    })
}

exports.createSnake = (req, res, next) => {
    const newSnake = new Snake({
        _id: new mongoose.Types.ObjectId,
        color: req.body.color,
        description: req.body.description,
        firstAid: req.body.firstAid,
        headShape: req.body.headShape,
        image: req.body.image,
        name: req.body.name,
        otherName: req.body.otherName,
        pattern: req.body.pattern,
        scientificName: req.body.scientificName,
        venomLevel: req.body.venomLevel,
    })
    newSnake
    .save()
    .then(data => {
        console.log(data)
        res.status(201).json({
            "message": "New Snake Created!",
            "data" : newSnake._id
        })
    })
    .catch(err => {
        console.log(err)
    })
}