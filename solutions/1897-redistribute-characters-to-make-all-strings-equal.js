/**
 * Redistribute Characters To Make All Strings Equal
 * Intuition: Characters can move freely, so every letter’s total count must be divisible by the number of words.
 * Approach: 1. Tally `charFrequencies` over all words. 2. If any count % totalWordsCount !== 0, return false. 3. Else true.
 * Dry Run: words=["abc","aabc","bc"]. Counts a:3 b:3 c:3, n=3. Return true.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var makeEqual = function (words) {
  let charFrequencies = new Array(26).fill(0);
  let totalWordsCount = words.length;

  for (
    let wordIterationIndex = 0;
    wordIterationIndex < totalWordsCount;
    ++wordIterationIndex
  ) {
    let currentWordString = words[wordIterationIndex];
    for (
      let characterPosition = 0;
      characterPosition < currentWordString.length;
      ++characterPosition
    ) {
      let charAsciiValue = currentWordString.charCodeAt(characterPosition) - 97;
      charFrequencies[charAsciiValue]++;
    }
  }

  for (
    let alphabetCharacterIndex = 0;
    alphabetCharacterIndex < 26;
    ++alphabetCharacterIndex
  ) {
    let characterOccurrenceCount = charFrequencies[alphabetCharacterIndex];
    if (characterOccurrenceCount % totalWordsCount !== 0) {
      return false;
    }
  }

  return true;
};
