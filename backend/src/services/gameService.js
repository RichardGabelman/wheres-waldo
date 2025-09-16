const TOLERANCE = 2;

const verifyCharacterLocation = (character, guessX, guessY) => {
  const distance = Math.sqrt(
    Math.pow(character.x - guessX, 2) + 
    Math.pow(character.y - guessY, 2)
  );
  return distance <= TOLERANCE; // or some tolerance value
};

module.exports = { verifyCharacterLocation };