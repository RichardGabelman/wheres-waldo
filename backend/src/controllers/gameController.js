const prisma = require("../db/prisma");
const { verifyCharacterLocation } = require("../services/gameService");

async function submitGuess(req, res, next) {
  const { characterName, xPercent, yPercent } = req.body;

  try {
    const character = await prisma.character.findUnique({
      where: { name: characterName }
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    const isCorrect = verifyCharacterLocation(character, xPercent, yPercent);

    res.status(200).json({
      correct: isCorrect,
      message: isCorrect ? "Great guess!" : "Try again!"
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitGuess };

