/**
 * Swap Adjacent In Lr String
 * Time Complexity: O(length)
 * Space Complexity: O(length)
 */
var canTransform = function (start, result) {
  const startNonXCharacters = [];
  const resultNonXCharacters = [];
  const stringLength = start.length;

  for (
    let currentPosition = 0;
    currentPosition < stringLength;
    ++currentPosition
  ) {
    if (start[currentPosition] !== "X") {
      startNonXCharacters.push(start[currentPosition]);
    }
    if (result[currentPosition] !== "X") {
      resultNonXCharacters.push(result[currentPosition]);
    }
  }
  const filteredStartString = startNonXCharacters.join("");
  const filteredResultString = resultNonXCharacters.join("");

  if (filteredStartString !== filteredResultString) {
    return false;
  }

  const startCharacterIndices = [];
  const resultCharacterIndices = [];

  for (
    let currentScanIndex = 0;
    currentScanIndex < stringLength;
    ++currentScanIndex
  ) {
    if (start[currentScanIndex] !== "X") {
      startCharacterIndices.push(currentScanIndex);
    }
    if (result[currentScanIndex] !== "X") {
      resultCharacterIndices.push(currentScanIndex);
    }
  }

  const totalNonXCount = startCharacterIndices.length;

  for (let pairIterator = 0; pairIterator < totalNonXCount; ++pairIterator) {
    const originalStartPosition = startCharacterIndices[pairIterator];
    const originalResultPosition = resultCharacterIndices[pairIterator];

    const inspectedCharacter = start[originalStartPosition];

    if (inspectedCharacter === "L") {
      if (originalStartPosition < originalResultPosition) {
        return false;
      }
    } else {
      if (originalStartPosition > originalResultPosition) {
        return false;
      }
    }
  }

  return true;
};
