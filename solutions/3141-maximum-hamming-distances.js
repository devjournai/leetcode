/**
 * Maximum Hamming Distances
 * Intuition: For every m-bit mask, dp[mask] is the farthest Hamming distance from that mask to any value in nums. Flipping one bit at a time (SOS DP / shortest-path on the hypercube from the given numbers) yields the farthest reachable original number.
 * Approach: 1. Initialize dp of size 2^m to -inf, and set dp[num] = 0 for each num in nums. 2. For each bit, create a new table where newDp[mask] = max(dp[mask], dp[mask xor 2^bit] + 1). 3. After all bits, answer[i] = dp[nums[i]].
 * Dry Run: nums = [0, 1], m = 2
 * - Values 00 and 01 differ by one bit, so after the hypercube DP both answers are 1
 * - Result = [1, 1]
 * Time Complexity: O(m * 2^m)
 * Space Complexity: O(2^m)
 */
var maxHammingDistances = function (nums, m) {
  const maxMask = 1 << m;
  const dp = new Array(maxMask).fill(Number.NEGATIVE_INFINITY);

  for (const num of nums) {
    dp[num] = 0;
  }

  for (let bit = 0; bit < m; bit++) {
    const newDp = new Array(maxMask);
    const bitMask = 1 << bit;
    for (let mask = 0; mask < maxMask; mask++) {
      newDp[mask] = Math.max(dp[mask], dp[mask ^ bitMask] + 1);
    }
    for (let mask = 0; mask < maxMask; mask++) {
      dp[mask] = newDp[mask];
    }
  }

  return nums.map((num) => dp[num]);
};
