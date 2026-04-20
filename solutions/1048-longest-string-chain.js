/**
 * Longest String Chain
 * Time Complexity: O(N log N + N * L^2)
 * Space Complexity: O(N * L)
 */
var longestStrChain = function (words) {
  const chainLengthsMap = new Map();
  let globalMaxChainLength = 1;

  const sortedWords = words.sort(
    (firstWord, secondWord) => firstWord.length - secondWord.length,
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
          chainLengthsMap.get(candidatePredecessor) + 1,
        );
      }
    }

    chainLengthsMap.set(currentWord, currentWordChainValue);
    globalMaxChainLength = Math.max(
      globalMaxChainLength,
      currentWordChainValue,
    );
  }

  return globalMaxChainLength;
};
