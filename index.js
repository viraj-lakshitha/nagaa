const express = require('express')
const mongoose = require('mongoose')

// Server and database configurations
const app = express()

app.use(express.json());
require('dotenv').config()

// Establish connection to database
const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL)
db.on('error', (error) => {
    console.log("Unable to connect database: ", error)
})
db.on('connected', () => {
    console.log("Database connection established")
})

// Handling CORS - We don't need to handle CORS in Postman
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // allowing to all origins
    res.header(
      "Access-Control-Allow-Header",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET, PATCH");
      return res.status(200), json({});
    }
    next();
  });

// Filter API Requests
const snakeRouter = require("./middleware/route")
app.use("/snake", snakeRouter)

// Start application
app.listen(process.env.PORT, () => {
    console.log(`Server Started at ${process.env.PORT}`)
})