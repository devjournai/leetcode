/**
 * Slowest Key
 * Intuition: Duration of key i is releaseTimes[i] - releaseTimes[i-1] (key 0 uses releaseTimes[0]). Track the longest duration, breaking ties by the larger character.
 * Approach: 1. Initialize with key 0. 2. For each later key, compute duration. 3. Replace the answer if duration is larger, or equal and the char is larger.
 * Dry Run: releaseTimes=[9,29,49,50], keysPressed="cbcd".
 *   - Durations 9,20,20,1; max 20 with later 'c' → "c".
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var slowestKey = function (releaseTimes, keysPressed) {
  let longestPressDuration = releaseTimes[0];
  let longestPressChar = keysPressed[0];

  let keyScanIndex = 1;
  while (keyScanIndex < releaseTimes.length) {
    let currentKeyDuration =
      releaseTimes[keyScanIndex] - releaseTimes[keyScanIndex - 1];
    let currentKeyCharacter = keysPressed[keyScanIndex];

    if (currentKeyDuration > longestPressDuration) {
      longestPressDuration = currentKeyDuration;
      longestPressChar = currentKeyCharacter;
    } else if (currentKeyDuration === longestPressDuration) {
      if (currentKeyCharacter > longestPressChar) {
        longestPressChar = currentKeyCharacter;
      }
    }
    keyScanIndex++;
  }

  return longestPressChar;
};
