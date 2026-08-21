/**
 * Uncrossed Lines
 * Intuition: Uncrossed lines are an LCS of the two arrays. Classic DP: match adds 1 from the diagonal, else take max of skip-left or skip-up.
 * Approach: 1. Table (m+1)x(n+1) of zeros. 2. If nums1[i-1]==nums2[j-1], dp[i][j]=dp[i-1][j-1]+1. 3. Else max(dp[i-1][j], dp[i][j-1]). 4. Return dp[m][n].
 * Dry Run: nums1=[1,4,2], nums2=[1,2,4].
 *   - 1 matches 1. Then 4 matches later 4 or 2 matches 2, LCS length 2.
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
