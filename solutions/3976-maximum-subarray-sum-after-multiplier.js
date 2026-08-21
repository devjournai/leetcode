/**
 * Maximum Subarray Sum After Multiplier
 * Intuition: We define f[i][j] as the maximum subarray sum ending at nums[i] with current state j. There are 4 states for j:
 * Approach: We define f[i][j] as the maximum subarray sum ending at nums[i] with current state j. There are 4 states for j: - State 0: the current subarray has not undergone any operation yet; - State 1: the current subarray is being multiplied by k; - State 2: the current subarray is being divided by k; - State 3: the operation on the current subarray has been completed. Initially, f[0][0] = 0, and all other f[i][j] = -infty.
 * Dry Run: Input: nums = [1,-2,3,4,-5], k = 2. Output: 14.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  const inf = -1e18;

  const f = Array.from({ length: n + 1 }, () => {
    const arr = new Array(4).fill(inf);
    return arr;
  });

  f[0][0] = 0;
  let ans = inf;

  for (let i = 1; i <= n; i++) {
    const x = nums[i - 1];

    f[i][0] = Math.max(f[i - 1][0], 0) + x;
    f[i][1] = Math.max(Math.max(f[i - 1][0], f[i - 1][1]), 0) + x * k;
    f[i][2] =
      Math.max(Math.max(f[i - 1][0], f[i - 1][2]), 0) + Math.trunc(x / k);
    f[i][3] = Math.max(Math.max(f[i - 1][1], f[i - 1][2]), f[i - 1][3]) + x;

    ans = Math.max(ans, Math.max(...f[i]));
  }

  return ans;
};
