/**
 * Most Common Word
 * Intuition: Tokenize letters into lowercase words; skip banned; keep a running max count.
 * Approach: 1. Banned Set. 2. Scan paragraph plus one past the end; accumulate a–z/A–Z, else flush the buffer. 3. If not banned, bump Map and maybe update `finalWord`.
 * Dry Run: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]. "ball" appears twice → "ball".
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
