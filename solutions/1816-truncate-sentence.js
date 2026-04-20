/**
 * Truncate Sentence
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var truncateSentence = function (sentenceInput, wordsToKeep) {
  let spaceDelimiterCount = 0;
  let truncationPointIndex = sentenceInput.length;

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < sentenceInput.length;
    currentCharacterIndex++
  ) {
    if (sentenceInput[currentCharacterIndex] === " ") {
      spaceDelimiterCount++;
      if (spaceDelimiterCount === wordsToKeep) {
        truncationPointIndex = currentCharacterIndex;
        break;
      }
    }
  }

  return sentenceInput.substring(0, truncationPointIndex);
};
