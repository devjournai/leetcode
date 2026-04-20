/**
 * Longest Palindromic Subsequence
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var longestPalindromeSubseq = function (s) {
  const inputStringLength = s.length;

  if (inputStringLength === 0) {
    return 0;
  }

  const dpResultMatrix = Array(inputStringLength)
    .fill(null)
    .map(() => Array(inputStringLength).fill(0));

  for (
    let outerLoopIndex = inputStringLength - 1;
    outerLoopIndex >= 0;
    outerLoopIndex--
  ) {
    dpResultMatrix[outerLoopIndex][outerLoopIndex] = 1;
    for (
      let innerLoopIndex = outerLoopIndex + 1;
      innerLoopIndex < inputStringLength;
      innerLoopIndex++
    ) {
      if (s[outerLoopIndex] === s[innerLoopIndex]) {
        dpResultMatrix[outerLoopIndex][innerLoopIndex] =
          2 + dpResultMatrix[outerLoopIndex + 1][innerLoopIndex - 1];
      } else {
        dpResultMatrix[outerLoopIndex][innerLoopIndex] = Math.max(
          dpResultMatrix[outerLoopIndex + 1][innerLoopIndex],
          dpResultMatrix[outerLoopIndex][innerLoopIndex - 1],
        );
      }
    }
  }

  return dpResultMatrix[0][inputStringLength - 1];
};
