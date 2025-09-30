const express = require("express");
const gameRouter = require("./game.js");

const router = express.Router();

router.use("/game", gameRouter);

// TODO
// router.get("/characters", getCharacters);

module.exports = router;