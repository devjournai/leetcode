/**
 * Truncate Sentence
 * Intuition: Keep the first k words, i.e. cut at the k-th space (or the full string if there are fewer than k spaces).
 * Approach: 1. Scan characters counting spaces. 2. On the k-th space set `truncationPointIndex` and break. 3. Return substring [0, that index).
 * Dry Run: sentence = "Hello how are you Contestant", k = 4.
 *   - Fourth space is before "Contestant" → "Hello how are you".
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
