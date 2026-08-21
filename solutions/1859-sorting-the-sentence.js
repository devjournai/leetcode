/**
 * Sorting The Sentence
 * Intuition: Each token ends with its 1-based position. Place the word (without the digit) into that slot and join with spaces.
 * Approach: 1. Split `s`. 2. For each `currentWordSegment`, index = last char − 1, store `pureWord` in `correctlyPlacedWords`. 3. Join.
 * Dry Run: s = "is2 sentence4 This1 a3".
 *   - slots: This, is, a, sentence. Return "This is a sentence".
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var sortSentence = function (s) {
  const wordSegments = s.split(" ");
  const correctlyPlacedWords = new Array(wordSegments.length);

  for (const currentWordSegment of wordSegments) {
    const finalCharacter = currentWordSegment.slice(-1);
    const positionIndex = parseInt(finalCharacter) - 1;
    const pureWord = currentWordSegment.slice(0, -1);
    correctlyPlacedWords[positionIndex] = pureWord;
  }

  const resultSentence = correctlyPlacedWords.join(" ");
  return resultSentence;
};
