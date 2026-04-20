/**
 * Check If The Sentence Is Pangram
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var checkIfPangram = function (sentence) {
  const alphabetPresence = new Array(26).fill(false);
  const offsetValue = "a".charCodeAt(0);

  for (let charLetter of sentence) {
    const charCodeValue = charLetter.charCodeAt(0);
    const alphaIndex = charCodeValue - offsetValue;
    if (alphaIndex >= 0 && alphaIndex < 26) {
      alphabetPresence[alphaIndex] = true;
    }
  }

  for (let positionCheck = 0; positionCheck < 26; positionCheck++) {
    if (!alphabetPresence[positionCheck]) {
      return false;
    }
  }

  return true;
};
