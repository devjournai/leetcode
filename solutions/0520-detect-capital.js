/**
 * Detect Capital
 * Intuition: Valid usage is all-caps, all-lowercase, or only the first letter capital. Count uppercase letters and check those three cases.
 * Approach: 1. Length 1 is true. 2. Count chars in `'A'..'Z'`. 3. True if count equals length, equals 0, or equals 1 with `word[0]` uppercase. Else false.
 * Dry Run: word = "FlaG".
 *   - Two capitals, first is F, not all-caps. Return false. "USA" count=3 equals length → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var detectCapitalUse = function (word) {
  const totalLength = word.length;

  if (totalLength === 1) {
    return true;
  }

  let capitalLetterCounter = 0;
  for (let charIdentifier = 0; charIdentifier < totalLength; charIdentifier++) {
    const currentAlphabet = word[charIdentifier];
    if (currentAlphabet >= "A" && currentAlphabet <= "Z") {
      capitalLetterCounter++;
    }
  }

  if (capitalLetterCounter === totalLength) {
    return true;
  } else if (capitalLetterCounter === 0) {
    return true;
  } else if (capitalLetterCounter === 1) {
    const initialCharacter = word[0];
    if (initialCharacter >= "A" && initialCharacter <= "Z") {
      return true;
    }
  }

  return false;
};
