/**
 * String Matching In An Array
 * Intuition: A word is a match if it is a substring of some other word. Check every ordered pair with includes.
 * Approach: 1. For each word i, scan every j ≠ i. 2. If words[j].includes(words[i]), record i and break. 3. Return the collected unique strings.
 * Dry Run: words = ["mass","as","hero","superhero"].
 *   - "as" ⊂ "mass", "hero" ⊂ "superhero". Return ["as","hero"].
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
