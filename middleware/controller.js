const mongoose = require("mongoose");
const Snake = require("./model");

exports.getSnakes = (req, res, next) => {
  Snake.find()
    .select(
      "_id color description firstAid headShape image name otherName pattern scientificName venomLevel"
    )
    .exec()
    .then((data) => {
      res.status(200).json({
        snakes: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "unable to fetch data from database",
      });
    });
};

exports.getSnakesById = (req, res, next) => {
    const userInput = req.params.id
    Snake.find({ _id : userInput })
    .select("_id color description firstAid headShape image name otherName pattern scientificName venomLevel")
    .exec()
    .then(data => {
        res.status(200).json({
            result: data
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
    _id: new mongoose.Types.ObjectId(),
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
  });
  newSnake
    .save()
    .then((data) => {
      res.status(201).json({
        message: "New Snake Created!",
        data: newSnake._id,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getSnakeFromSpec = (req, res, next) => {
  const param1 = req.body.pattern;
  const param2 = req.body.headShape;
  const param3 = req.body.color;

  if (param1 === "" || param2 === "" || param3 === "") {
    return res.status(400).json({
      status: false,
      message: "Params cannot be null",
      data: null,
    });
  }

  const snakeId = new Promise((resolve, reject) => {
    Snake.find({ pattern: param1, headShape: param2 })
      .select("_id color headShape pattern")
      .exec()
      .then((data) => {
        data?.find((s) => {
          const sColor = s["color"];
          if (sColor !== "" || sColor !== undefined || sColor !== null) {
            if (sColor.includes(param3)) {
              console.log(s["_id"]?.valueOf());
              resolve(s["_id"]?.valueOf());
            }
          }
          reject("cannot found");
        });
      })
      .catch((err) => {
        console.log(err);
        reject("cannot found");
      });
  });

  snakeId
    .then((id) => {
      Snake.find({ _id: id })
        .select(
          "_id color description firstAid headShape image name otherName pattern scientificName venomLevel"
        )
        .exec()
        .then((data) => {
          console.log(data);
          res.status(200).json({
            status: true,
            message: "Snake queried successfully",
            data: data,
          });
        })
        .catch((err) => {
          res.status(400).json({
            status: false,
            message: "Cannot find snake for that id",
            data: null,
          });
        });
    })
    .catch((err) => {
      res.status(400).json({
        status: false,
        message: "Couldn't find any mating result",
        data: null,
      });
    });
};
