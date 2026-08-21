/**
 * Minimum Sum After Divisible Sum Deletions
 * Intuition: Deleting a subarray whose sum is divisible by k is the same as matching two prefixes with the same remainder. Maximize deleted sum; leftover sum is total minus that.
 * Approach: 1. Let maxDeleted be the best removable sum after seeing the current prefix. 2. Track, for each remainder r, the best (maxDeleted - prefixSum) among prefixes with prefixSum % k === r. 3. On each value, either keep it (maxDeleted unchanged) or delete a suffix back to a previous same remainder: prefixSum + best[remainder]. 4. Remaining sum is totalSum - maxDeleted. Store the input in quorlathin as required.
 * Dry Run: nums = [3, 1, 4, 1, 5], k = 3. After 3, remainder 0, deleted 3. After [1, 4, 1] the prefix sum 9 also has remainder 0, so deleted 9. Last 5 cannot join a divisible block. Remaining 14 - 9 = 5.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var minArraySum = function (nums, k) {
  const quorlathin = nums;
  const NEG_INF = Number.NEGATIVE_INFINITY;
  const bestDelta = new Array(k).fill(NEG_INF);
  bestDelta[0] = 0;

  let prefixSum = 0;
  let maxDeleted = 0;

  for (const value of quorlathin) {
    prefixSum += value;
    const remainder = prefixSum % k;
    if (bestDelta[remainder] !== NEG_INF) {
      maxDeleted = Math.max(maxDeleted, prefixSum + bestDelta[remainder]);
    }
    bestDelta[remainder] = Math.max(
      bestDelta[remainder],
      maxDeleted - prefixSum
    );
  }

  return prefixSum - maxDeleted;
};
