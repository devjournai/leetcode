/**
 * Longest Common Subsequence
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var longestCommonSubsequence = function (text1, text2) {
  const firstStringLength = text1.length;
  const secondStringLength = text2.length;

  const memoizationTable = Array(firstStringLength + 1)
    .fill(null)
    .map(() => Array(secondStringLength + 1).fill(-1));

  function calculateLCS(currentIdx1, currentIdx2) {
    if (
      currentIdx1 === firstStringLength ||
      currentIdx2 === secondStringLength
    ) {
      return 0;
    }

    if (memoizationTable[currentIdx1][currentIdx2] !== -1) {
      return memoizationTable[currentIdx1][currentIdx2];
    }

    const characterOne = text1.charAt(currentIdx1);
    const characterTwo = text2.charAt(currentIdx2);

    let currentMax;
    if (characterOne === characterTwo) {
      const resultMatch = 1 + calculateLCS(currentIdx1 + 1, currentIdx2 + 1);
      currentMax = resultMatch;
    } else {
      const resultSkipFirst = calculateLCS(currentIdx1 + 1, currentIdx2);
      const resultSkipSecond = calculateLCS(currentIdx1, currentIdx2 + 1);
      currentMax = Math.max(resultSkipFirst, resultSkipSecond);
    }

    memoizationTable[currentIdx1][currentIdx2] = currentMax;
    return currentMax;
  }

  return calculateLCS(0, 0);
};
