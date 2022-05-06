const express = require("express")
const router = express.Router()
const SnakeController = require("./controller")

router.post("/", SnakeController.createSnake);
router.get("/", SnakeController.getSnakes);

module.exports = router;