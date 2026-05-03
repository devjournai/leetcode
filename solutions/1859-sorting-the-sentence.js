/**
 * Sorting The Sentence
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
