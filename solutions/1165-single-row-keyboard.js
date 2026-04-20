/**
 * Single Row Keyboard
 * Time Complexity: O(W)
 * Space Complexity: O(1)
 */
var calculateTime = function (keyboard, word) {
  const charToIndexMap = new Map();
  let keyboardScanIndex = 0;

  for (
    keyboardScanIndex = 0;
    keyboardScanIndex < keyboard.length;
    ++keyboardScanIndex
  ) {
    charToIndexMap.set(keyboard[keyboardScanIndex], keyboardScanIndex);
  }

  let currentFingerLocation = 0;
  let accumulatedTravelTime = 0;

  for (const charToType of word) {
    const desiredCharLocation = charToIndexMap.get(charToType);
    const movementCost = Math.abs(currentFingerLocation - desiredCharLocation);
    accumulatedTravelTime += movementCost;
    currentFingerLocation = desiredCharLocation;
  }

  return accumulatedTravelTime;
};
