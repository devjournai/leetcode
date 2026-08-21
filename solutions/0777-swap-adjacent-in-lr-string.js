/**
 * Swap Adjacent In Lr String
 * Intuition: `XL`→`LX` moves L left; `RX`→`XR` moves R right. After dropping X, the L/R sequences must match, each L cannot move right, and each R cannot move left.
 * Approach: 1. Collect non-X chars from `start` and `result`; if `filteredStartString !== filteredResultString`, return false. 2. Collect their indices into `startCharacterIndices` / `resultCharacterIndices`. 3. For each pair, if the char is `'L'` and start index < result index, or not L (so R) and start index > result index, return false. 4. Else true.
 * Dry Run: start = "RXXLRXRXL", result = "XRLXXRRLX".
 *   - Non-X both "RLRRL". Start indices [0,3,4,6,8], result [1,2,5,6,7].
 *   - R 0→1 (right), L 3→2 (left), R 4→5, R 6→6, L 8→7 (left). Return true.
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
