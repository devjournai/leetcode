/**
 * Longest String Chain
 * Intuition: After sorting by length, a word's longest chain is 1 plus the best chain of any predecessor formed by deleting one character.
 * Approach: 1. Sort words by length. 2. For each word, try every one-char deletion; if that predecessor is in the map, take max+1. 3. Store the chain length and track the global max.
 * Dry Run: words = ["a","b","ba","bca","bda","bdca"].
 *   - "a"/"b" = 1. "ba" from "a" or "b" = 2. "bca"/"bda" = 3. "bdca" = 4.
 * Time Complexity: O(N log N + N * L^2)
 * Space Complexity: O(N * L)
 */
var longestStrChain = function (words) {
  const chainLengthsMap = new Map();
  let globalMaxChainLength = 1;

  const sortedWords = words.sort(
    (firstWord, secondWord) => firstWord.length - secondWord.length
  );

  for (const currentWord of sortedWords) {
    let currentWordChainValue = 1;
    const wordCharCount = currentWord.length;

    for (
      let charToRemoveIndex = 0;
      charToRemoveIndex < wordCharCount;
      charToRemoveIndex++
    ) {
      const candidatePredecessor =
        currentWord.substring(0, charToRemoveIndex) +
        currentWord.substring(charToRemoveIndex + 1);

      if (chainLengthsMap.has(candidatePredecessor)) {
        currentWordChainValue = Math.max(
          currentWordChainValue,
          chainLengthsMap.get(candidatePredecessor) + 1
        );
      }
    }

    chainLengthsMap.set(currentWord, currentWordChainValue);
    globalMaxChainLength = Math.max(
      globalMaxChainLength,
      currentWordChainValue
    );
  }

  return globalMaxChainLength;
};
