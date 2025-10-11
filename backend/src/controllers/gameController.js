const prisma = require("../db/prisma");
const { verifyCharacterLocation } = require("../services/gameService");

async function startSession(req, res, next) {
  try {
    const session = await prisma.session.create();

    res.status(201).json(session);
  } catch (err) {
    next(err);
  }
}

async function submitGuess(req, res, next) {
  const { sessionId, characterName, xPercent, yPercent } = req.body;

  try {
    // Verify session exists
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      include: { foundChars: true },
    });

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // TODO: Change to findUnique and pass imageId if more than 1 image
    // Verify character exists
    const character = await prisma.character.findFirst({
      where: { name: characterName },
    });

    if (!character) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Verify guess correctness
    const isCorrect = verifyCharacterLocation(character, xPercent, yPercent);

    // Prevent duplicate guess correctness
    const alreadyGuessed = session.foundChars.some(
      (c) => c.id === character.id
    );

    if (alreadyGuessed) {
      return res.status(200).json({
        correct: false,
        message: "You've already found this one!",
      });
    }

    let allFound = false;
    if (isCorrect) {
      // Check if they've guessed all of them correctly
      const totalChars = await prisma.character.count();
      const updatedCount = session.foundChars.length + 1;

      allFound = updatedCount === totalChars;

      // Update session with correct guess
      await prisma.session.update({
        where: { id: sessionId },
        data: {
          foundChars: { connect: { id: character.id } },
          // If they have, set end time
          ...(allFound && { completed: true, endTime: new Date() }),
        },
      });
    }

    res.status(200).json({
      correct: isCorrect,
      message: allFound
        ? "You found everyone! Great job!"
        : isCorrect
        ? "Great guess!"
        : "Try again!",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { startSession, submitGuess };
