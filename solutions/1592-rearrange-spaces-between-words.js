/**
 * Rearrange Spaces Between Words
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reorderSpaces = function (textInput) {
  let textLength = textInput.length;
  let spaceTally = 0;
  let collectedWords = [];
  let currentWordCharacters = [];

  for (
    let currentPosition = 0;
    currentPosition < textLength;
    ++currentPosition
  ) {
    let characterAtPosition = textInput[currentPosition];
    if (characterAtPosition === " ") {
      spaceTally++;
      if (currentWordCharacters.length > 0) {
        collectedWords.push(currentWordCharacters.join(""));
        currentWordCharacters = [];
      }
    } else {
      currentWordCharacters.push(characterAtPosition);
    }
  }

  if (currentWordCharacters.length > 0) {
    collectedWords.push(currentWordCharacters.join(""));
  }

  let numberOfWords = collectedWords.length;

  let spacesForGaps = 0;
  let trailingLeftoverSpaces = 0;

  if (numberOfWords === 1) {
    spacesForGaps = 0;
    trailingLeftoverSpaces = spaceTally;
  } else {
    spacesForGaps = Math.floor(spaceTally / (numberOfWords - 1));
    trailingLeftoverSpaces = spaceTally % (numberOfWords - 1);
  }

  let gapStringCreator = [];
  for (let spaceCounter = 0; spaceCounter < spacesForGaps; ++spaceCounter) {
    gapStringCreator.push(" ");
  }
  let interWordSpaceString = gapStringCreator.join("");

  let leftoverSpaceCreator = [];
  for (
    let extraSpaceCounter = 0;
    extraSpaceCounter < trailingLeftoverSpaces;
    ++extraSpaceCounter
  ) {
    leftoverSpaceCreator.push(" ");
  }
  let finalTrailingSpaceString = leftoverSpaceCreator.join("");

  let resultSegments = [];
  for (let wordIterator = 0; wordIterator < numberOfWords; ++wordIterator) {
    resultSegments.push(collectedWords[wordIterator]);
    if (wordIterator < numberOfWords - 1) {
      resultSegments.push(interWordSpaceString);
    }
  }

  resultSegments.push(finalTrailingSpaceString);

  return resultSegments.join("");
};
