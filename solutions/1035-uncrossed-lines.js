/**
 * Uncrossed Lines
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maxUncrossedLines = function (nums1, nums2) {
  const firstLength = nums1.length;
  const secondLength = nums2.length;

  const memoizationTable = new Array(firstLength + 1)
    .fill(0)
    .map(() => new Array(secondLength + 1).fill(0));

  for (let rowCounter = 1; rowCounter <= firstLength; rowCounter++) {
    for (let colCounter = 1; colCounter <= secondLength; colCounter++) {
      const currentNum1 = nums1[rowCounter - 1];
      const currentNum2 = nums2[colCounter - 1];

      if (currentNum1 === currentNum2) {
        const diagonalValue = memoizationTable[rowCounter - 1][colCounter - 1];
        memoizationTable[rowCounter][colCounter] = diagonalValue + 1;
      } else {
        const upValue = memoizationTable[rowCounter - 1][colCounter];
        const leftValue = memoizationTable[rowCounter][colCounter - 1];
        memoizationTable[rowCounter][colCounter] = Math.max(upValue, leftValue);
      }
    }
  }

  const maxCrossedLines = memoizationTable[firstLength][secondLength];
  return maxCrossedLines;
};
