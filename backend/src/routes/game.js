const express = require("express");
const gameController = require("../controllers/gameController.js");

const router = express.Router();

router.use("/guess", gameController.submitGuess);

module.exports = router;