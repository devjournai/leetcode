/**
 * Detect Capital
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
