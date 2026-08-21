/**
 * Count Partitions with Max-Min Difference at Most K
 * Intuition: DP f[i] = ways to partition the prefix of length i so every piece has max-min ≤ k. For a fixed right end, valid left starts form a suffix of the prefix; prefix sums of f give the range sum in O(1) after a sliding window.
 * Approach: 1. Two pointers plus monotonic deques keep the longest [left, right] with max-min ≤ k. 2. f[right] = sum of f[j] for j in [left-1, right-2] wait: last segment is nums[j..right-1] with j-1 in the window of valid starts, i.e. j from left to right. f[i] += prefixF[i-1] - prefixF[left-2].
 * Dry Run: nums = [9, 4, 1, 3, 7], k = 4. Several valid partitions of the whole array; DP accumulates them modulo 1e9+7.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countPartitions = function (nums, k) {
  const MOD = 1000000007;
  const n = nums.length;
  const f = new Array(n + 1).fill(0);
  const prefix = new Array(n + 1).fill(0);
  f[0] = 1;
  prefix[0] = 1;

  const maxDeque = [];
  const minDeque = [];
  let left = 0;

  for (let right = 0; right < n; right++) {
    while (
      maxDeque.length &&
      nums[maxDeque[maxDeque.length - 1]] <= nums[right]
    ) {
      maxDeque.pop();
    }
    maxDeque.push(right);
    while (
      minDeque.length &&
      nums[minDeque[minDeque.length - 1]] >= nums[right]
    ) {
      minDeque.pop();
    }
    minDeque.push(right);

    while (nums[maxDeque[0]] - nums[minDeque[0]] > k) {
      if (maxDeque[0] === left) {
        maxDeque.shift();
      }
      if (minDeque[0] === left) {
        minDeque.shift();
      }
      left++;
    }

    const sum =
      (prefix[right] - (left >= 1 ? prefix[left - 1] : 0) + MOD) % MOD;
    f[right + 1] = sum;
    prefix[right + 1] = (prefix[right] + f[right + 1]) % MOD;
  }

  return f[n];
};
