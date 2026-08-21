/**
 * Split Array With Minimum Difference
 * Intuition: A valid cut needs a strictly increasing prefix and a strictly decreasing suffix. Among those cuts, minimize |prefixSum - suffixSum|.
 * Approach: 1. Prefix sums. 2. Boolean arrays for increasing prefixes and decreasing suffixes. 3. Try every cut i | i+1 both valid.
 * Dry Run: nums = [1, 3, 2]. Cuts after 1 (diff 4) and after [1, 3] (diff 2) → 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var splitArray = function (nums) {
  const n = nums.length;
  const prefixSums = Array(n).fill(0);
  prefixSums[0] = nums[0];
  for (let i = 1; i < n; i++) {
    prefixSums[i] = prefixSums[i - 1] + nums[i];
  }

  const increasingPrefix = Array(n).fill(true);
  for (let i = 1; i < n; i++) {
    increasingPrefix[i] = increasingPrefix[i - 1] && nums[i] > nums[i - 1];
  }
  const decreasingSuffix = Array(n).fill(true);
  for (let i = n - 2; i >= 0; i--) {
    decreasingSuffix[i] = decreasingSuffix[i + 1] && nums[i] > nums[i + 1];
  }

  let minDiff = Infinity;
  for (let cut = 0; cut < n - 1; cut++) {
    if (increasingPrefix[cut] && decreasingSuffix[cut + 1]) {
      const leftSum = prefixSums[cut];
      const rightSum = prefixSums[n - 1] - prefixSums[cut];
      minDiff = Math.min(minDiff, Math.abs(leftSum - rightSum));
    }
  }
  return minDiff === Infinity ? -1 : minDiff;
};
