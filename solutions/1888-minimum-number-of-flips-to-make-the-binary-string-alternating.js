/**
 * Minimum Number of Flips to Make the Binary String Alternating
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minFlips = function (s) {
  const stringLength = s.length;
  let minimumFlipsResult = stringLength;

  let flipsForZeroPattern = 0;
  let flipsForOnePattern = 0;

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < stringLength;
    currentCharacterIndex++
  ) {
    const charAtCurrentIndex = s[currentCharacterIndex];
    const expectedPatternZero = currentCharacterIndex % 2 === 0 ? "0" : "1";
    const expectedPatternOne = currentCharacterIndex % 2 === 0 ? "1" : "0";

    if (charAtCurrentIndex !== expectedPatternZero) {
      flipsForZeroPattern++;
    }
    if (charAtCurrentIndex !== expectedPatternOne) {
      flipsForOnePattern++;
    }
  }

  minimumFlipsResult = Math.min(
    minimumFlipsResult,
    flipsForZeroPattern,
    flipsForOnePattern,
  );

  for (let rotationStep = 0; rotationStep < stringLength - 1; rotationStep++) {
    const charRemovedFromFront = s[rotationStep];
    const removedCharOriginalIndex = rotationStep;
    const expectedZeroAtRemovedIndex =
      removedCharOriginalIndex % 2 === 0 ? "0" : "1";
    const expectedOneAtRemovedIndex =
      removedCharOriginalIndex % 2 === 0 ? "1" : "0";

    if (charRemovedFromFront !== expectedZeroAtRemovedIndex) {
      flipsForZeroPattern--;
    }
    if (charRemovedFromFront !== expectedOneAtRemovedIndex) {
      flipsForOnePattern--;
    }

    const charAddedToEnd = s[rotationStep];
    const addedCharEffectiveIndex = stringLength + rotationStep;
    const expectedZeroAtAddedIndex =
      addedCharEffectiveIndex % 2 === 0 ? "0" : "1";
    const expectedOneAtAddedIndex =
      addedCharEffectiveIndex % 2 === 0 ? "1" : "0";

    if (charAddedToEnd !== expectedZeroAtAddedIndex) {
      flipsForZeroPattern++;
    }
    if (charAddedToEnd !== expectedOneAtAddedIndex) {
      flipsForOnePattern++;
    }

    minimumFlipsResult = Math.min(
      minimumFlipsResult,
      flipsForZeroPattern,
      flipsForOnePattern,
    );
  }

  return minimumFlipsResult;
};
