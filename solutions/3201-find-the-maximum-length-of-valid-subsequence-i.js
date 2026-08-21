/**
 * Find The Maximum Length Of Valid Subsequence I
 * Intuition: A valid subsequence has all adjacent sums the same parity, so it is all even, all odd, or alternating. Track the longest pattern of each type with a 2x2 DP.
 * Approach: 1. dp[lastParity][desiredParity] is the best length ending with lastParity when the pair pattern wants desiredParity next. 2. For each x, for y in {0,1}, extend dp[x%2][y] from dp[y][x%2]. 3. Return the max cell.
 * Dry Run:
 *   nums = [1,2,3,4] alternating odd-even can take all 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumLength = function (nums) {
  const lengthByParityPattern = [
    [0, 0],
    [0, 0],
  ];
  for (const currentValue of nums) {
    const currentParity = currentValue % 2;
    for (let otherParity = 0; otherParity < 2; otherParity++) {
      lengthByParityPattern[currentParity][otherParity] =
        lengthByParityPattern[otherParity][currentParity] + 1;
    }
  }
  return Math.max(...lengthByParityPattern[0], ...lengthByParityPattern[1]);
};
