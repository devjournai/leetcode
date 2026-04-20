/**
 * String Matching In An Array
 * Time Complexity: O(N^2 * L^2)
 * Space Complexity: O(N)
 */
var stringMatching = function (wordsInput) {
  const wordCount = wordsInput.length;
  const foundStrings = new Set();

  for (
    let currentWordIndex = 0;
    currentWordIndex < wordCount;
    currentWordIndex++
  ) {
    const primaryWord = wordsInput[currentWordIndex];
    for (
      let comparisonWordIndex = 0;
      comparisonWordIndex < wordCount;
      comparisonWordIndex++
    ) {
      const secondaryWord = wordsInput[comparisonWordIndex];

      if (
        currentWordIndex !== comparisonWordIndex &&
        secondaryWord.includes(primaryWord)
      ) {
        foundStrings.add(primaryWord);
        break;
      }
    }
  }

  return Array.from(foundStrings);
};
