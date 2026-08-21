/**
 * Concatenated Divisibility
 * Intuition: After sorting, search the lexicographically smallest permutation whose concatenation is 0 mod k, using bitmask DP on used numbers and current remainder.
 * Approach: 1. Sort nums, precompute 10^len(num) % k. 2. dp(mask, mod) is whether unused numbers can finish a 0 remainder. 3. Reconstruct by always trying the smallest unused index that leads to a true DP.
 * Dry Run: nums = [3, 12, 24], k = 9. Sorted [3,12,24]; some permutation concatenates to a multiple of 9.
 * Time Complexity: O(2^N * K * N)
 * Space Complexity: O(2^N * K)
 */
var concatenatedDivisibility = function (nums, k) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const pows = nums.map((num) => {
    const length = String(num).length;
    let power = 1;
    for (let i = 0; i < length; i++) power = (power * 10) % k;
    return power;
  });
  const memo = Array.from({ length: 1 << n }, () => new Array(k).fill(-1));

  const dp = (mask, mod) => {
    if (memo[mask][mod] !== -1) return memo[mask][mod] === 1;
    if (mask === (1 << n) - 1) {
      memo[mask][mod] = mod === 0 ? 1 : 0;
      return memo[mask][mod] === 1;
    }
    for (let i = 0; i < n; i++) {
      if (((mask >> i) & 1) === 0) {
        const newMod = (mod * pows[i] + nums[i]) % k;
        if (dp(mask | (1 << i), newMod)) {
          memo[mask][mod] = 1;
          return true;
        }
      }
    }
    memo[mask][mod] = 0;
    return false;
  };

  const reconstruct = (mask, mod) => {
    for (let i = 0; i < n; i++) {
      if (((mask >> i) & 1) === 0) {
        const newMod = (mod * pows[i] + nums[i]) % k;
        if (dp(mask | (1 << i), newMod)) {
          return [nums[i], ...reconstruct(mask | (1 << i), newMod)];
        }
      }
    }
    return [];
  };

  return dp(0, 0) ? reconstruct(0, 0) : [];
};
