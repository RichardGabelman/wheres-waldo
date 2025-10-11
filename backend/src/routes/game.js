const express = require("express");
const gameController = require("../controllers/gameController.js");

const router = express.Router();

router.use("/start-session", gameController.startSession);

// TODO: Edit guess to use sessionId, updating session
router.use("/guess", gameController.submitGuess);

module.exports = router;