/**
 * Maximize Palindrome Length From Subsequences
 * Intuition: Concatenate the two words and run classic LPS DP, but only record palindromes whose ends sit in different original words so each side contributes a nonempty subsequence.
 * Approach: 1. Build `combinedString = word1 + word2` and a `dpTable` of LPS lengths. 2. Expand by `spanLength`; matching ends add 2, else take max of inner skips. 3. When ends match and `beginIndex < word1.length <= endIndex`, update `maximumPalindromeResult`. 4. Return that value (0 if none).
 * Dry Run: word1 = "cacb", word2 = "cbba".
 *   - Combined "cacbcbba". Palindrome using both sides e.g. "abba" length 4. Return 4.
 * Time Complexity: O((L1 + L2)^2)
 * Space Complexity: O((L1 + L2)^2)
 */
var longestPalindrome = function (word1, word2) {
  let combinedString = word1 + word2;
  let totalLength = combinedString.length;
  let initialWordLength = word1.length;
  let maximumPalindromeResult = 0;

  let dpTable = Array.from({ length: totalLength }, () =>
    Array(totalLength).fill(0)
  );

  for (
    let currentPosition = 0;
    currentPosition < totalLength;
    ++currentPosition
  ) {
    dpTable[currentPosition][currentPosition] = 1;
  }

  for (let spanLength = 1; spanLength < totalLength; ++spanLength) {
    for (
      let beginIndex = 0;
      beginIndex < totalLength - spanLength;
      ++beginIndex
    ) {
      let endIndex = beginIndex + spanLength;

      if (combinedString[beginIndex] === combinedString[endIndex]) {
        dpTable[beginIndex][endIndex] =
          dpTable[beginIndex + 1][endIndex - 1] + 2;
        if (beginIndex < initialWordLength && endIndex >= initialWordLength) {
          maximumPalindromeResult = Math.max(
            maximumPalindromeResult,
            dpTable[beginIndex][endIndex]
          );
        }
      } else {
        dpTable[beginIndex][endIndex] = Math.max(
          dpTable[beginIndex + 1][endIndex],
          dpTable[beginIndex][endIndex - 1]
        );
      }
    }
  }

  return maximumPalindromeResult;
};
