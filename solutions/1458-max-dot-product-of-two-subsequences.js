/**
 * Max Dot Product Of Two Subsequences
 * Intuition: DP[i][j] is the best non-empty subsequence dot product using prefixes nums1[:i] and nums2[:j]: take the pair, skip one side, or extend a previous pairing.
 * Approach: 1. Table (m+1)x(n+1) filled with -Infinity. 2. For each pair of indices, product = nums1[i-1]*nums2[j-1]. 3. Candidate is max(product, product + dp[i-1][j-1] if finite, dp[i-1][j], dp[i][j-1]). 4. Return dp[m][n].
 * Dry Run: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
 *   - pairing 2*3=6 then -2*-6=12 extra -> 18
 *   - DP settles on 18
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maxDotProduct = function (nums1, nums2) {
  const firstArrayLength = nums1.length;
  const secondArrayLength = nums2.length;

  const memoizationTable = new Array(firstArrayLength + 1)
    .fill(null)
    .map(() => new Array(secondArrayLength + 1).fill(-Infinity));

  for (
    let firstArrayIndex = 1;
    firstArrayIndex <= firstArrayLength;
    firstArrayIndex++
  ) {
    for (
      let secondArrayIndex = 1;
      secondArrayIndex <= secondArrayLength;
      secondArrayIndex++
    ) {
      const currentElementProduct =
        nums1[firstArrayIndex - 1] * nums2[secondArrayIndex - 1];

      let maxIncludingCurrentPair = currentElementProduct;
      if (
        memoizationTable[firstArrayIndex - 1][secondArrayIndex - 1] !==
        -Infinity
      ) {
        maxIncludingCurrentPair = Math.max(
          maxIncludingCurrentPair,
          currentElementProduct +
            memoizationTable[firstArrayIndex - 1][secondArrayIndex - 1]
        );
      }

      const maxSkippingFirst =
        memoizationTable[firstArrayIndex - 1][secondArrayIndex];
      const maxSkippingSecond =
        memoizationTable[firstArrayIndex][secondArrayIndex - 1];

      memoizationTable[firstArrayIndex][secondArrayIndex] = Math.max(
        maxIncludingCurrentPair,
        maxSkippingFirst,
        maxSkippingSecond
      );
    }
  }

  return memoizationTable[firstArrayLength][secondArrayLength];
};
