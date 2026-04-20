/**
 * Most Common Word
 * Time Complexity: O(P + B)
 * Space Complexity: O(U + B)
 */
var mostCommonWord = function (paragraph, banned) {
  const bannedSet = new Set(banned);
  const wordCountsMap = new Map();

  let maxCount = 0;
  let finalWord = "";

  let paragraphLength = paragraph.length;
  let currentWordCharacters = [];

  for (let charIndex = 0; charIndex <= paragraphLength; charIndex++) {
    const currentLetter = paragraph[charIndex];

    if (
      currentLetter &&
      ((currentLetter >= "a" && currentLetter <= "z") ||
        (currentLetter >= "A" && currentLetter <= "Z"))
    ) {
      currentWordCharacters.push(currentLetter.toLowerCase());
    } else {
      if (currentWordCharacters.length > 0) {
        const extractedWord = currentWordCharacters.join("");

        if (!bannedSet.has(extractedWord)) {
          let countValue = (wordCountsMap.get(extractedWord) || 0) + 1;
          wordCountsMap.set(extractedWord, countValue);

          if (countValue > maxCount) {
            maxCount = countValue;
            finalWord = extractedWord;
          }
        }
        currentWordCharacters = [];
      }
    }
  }

  return finalWord;
};
