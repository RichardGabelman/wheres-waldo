const TOLERANCE = 2.5;

const verifyCharacterLocation = (character, guessX, guessY) => {
  const xDistance = Math.abs(character.xPercent - guessX)
  const yDistance = Math.abs(character.yPercent - guessY)
  return (xDistance <= TOLERANCE) && (yDistance <= TOLERANCE) // or some tolerance value
};

module.exports = { verifyCharacterLocation };