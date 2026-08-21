/**
 * Subsequence Sum After Capping Elements
 * Intuition: Values below the cap keep their original amounts; values at least the cap become the cap and can be used 0..count times. Build subset-sum DP on uncapped values while increasing the cap.
 * Approach: 1. Sort nums. 2. For cap x, insert all values < x into a 0/1 knapsack of capacity k. 3. Test whether k - t*x is reachable for some t using remaining capped copies.
 * Dry Run: nums = [4, 3, 2, 4], k = 5. Caps 1 and 2 cannot form 5; cap 3 can use 2+3 → [false, false, true, true].
 * Time Complexity: O(N K)
 * Space Complexity: O(K)
 */
var subsequenceSumAfterCapping = function (nums, k) {
  const n = nums.length;
  const sortedValues = [...nums].sort((left, right) => left - right);
  const canFormSum = Array(k + 1).fill(false);
  canFormSum[0] = true;
  const answer = Array(n).fill(false);
  let insertIndex = 0;

  for (let cap = 1; cap <= n; cap++) {
    while (insertIndex < n && sortedValues[insertIndex] < cap) {
      const value = sortedValues[insertIndex];
      for (let sum = k; sum >= value; sum--) {
        if (canFormSum[sum - value]) {
          canFormSum[sum] = true;
        }
      }
      insertIndex++;
    }
    const cappedCount = n - insertIndex;
    const startSum = Math.max(k % cap, k - cappedCount * cap);
    for (let sum = startSum; sum <= k; sum += cap) {
      if (canFormSum[sum]) {
        answer[cap - 1] = true;
        break;
      }
    }
  }
  return answer;
};
