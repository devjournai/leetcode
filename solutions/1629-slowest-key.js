/**
 * Slowest Key
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
