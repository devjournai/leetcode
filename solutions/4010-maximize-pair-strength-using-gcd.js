/**
 * Maximize Pair Strength Using GCD
 * Intuition: We directly enumerate all pairs (i, j) where i < j, calculate the strength of each pair frac{nums[i]  *  nums[j]}{gcd(nums[i], nums[j])^2}, and take the maximum.
 * Approach: We directly enumerate all pairs (i, j) where i < j, calculate the strength of each pair frac{nums[i]  *  nums[j]}{gcd(nums[i], nums[j])^2}, and take the maximum. The greatest common divisor gcd can be computed using the Euclidean algorithm.
 * Dry Run: Input: nums = [2,3,5]. Output: 15.
 * Time Complexity: O(n^2 * logM)
 * Space Complexity: O(1)
 */
var maxPairStrength = function (nums) {
  const n = nums.length;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const g = gcd(nums[i], nums[j]);
      const x = Math.floor((nums[i] * nums[j]) / (g * g));
      ans = Math.max(ans, x);
    }
  }

  return ans;
};
var gcd = function (a, b) {
  while (b !== 0) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
};
