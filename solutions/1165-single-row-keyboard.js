/**
 * Single Row Keyboard
 * Intuition: Time is the total Manhattan distance the finger travels along the row, starting at index 0.
 * Approach: 1. Map each keyboard letter to its index. 2. For each character of word, add |pos-finger| and move the finger.
 * Dry Run: keyboard = "abcdefghijklmnopqrstuvwxyz", word = "cba".
 *   - 0->2 cost 2, 2->1 cost 1, 1->0 cost 1. Total 4.
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
