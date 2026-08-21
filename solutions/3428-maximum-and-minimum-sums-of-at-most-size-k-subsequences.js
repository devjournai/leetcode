/**
 * Maximum and Minimum Sums of at Most Size K Subsequences
 * Intuition: After sorting, nums[i] is the max of subsequences drawn from the left and the min of subsequences drawn from the right. Those two counts are the same by symmetry.
 * Approach: 1. Sort nums. 2. Precompute binomial C(i, j) for j < k. 3. For each i, count = sum_j C(i, j) ways to pick at most k-1 other elements. 4. Add nums[i]*count and nums[n-1-i]*count modulo 1e9+7.
 * Dry Run: nums = [1,2,3], k = 2. Sorted same. i=0 count=C(0,0)=1 → 1+3. i=1 count=C(1,0)+C(1,1)=2 → 2+2. i=2 count=C(2,0)+C(2,1)=3 → 3+1. Total 12.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */

var minMaxSums = function (nums, k) {
  const MOD = 1000000007;
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const combinations = Array.from({ length: n + 1 }, () =>
    new Array(k).fill(0)
  );
  for (let index = 0; index <= n; index++) {
    combinations[index][0] = 1;
  }
  for (let index = 1; index <= n; index++) {
    for (let chosen = 1; chosen <= Math.min(k - 1, index); chosen++) {
      combinations[index][chosen] =
        (combinations[index - 1][chosen] +
          combinations[index - 1][chosen - 1]) %
        MOD;
    }
  }

  let answer = 0;
  for (let index = 0; index < n; index++) {
    let count = 0;
    for (let chosen = 0; chosen <= k - 1 && chosen <= index; chosen++) {
      count = (count + combinations[index][chosen]) % MOD;
    }
    answer = (answer + nums[index] * count) % MOD;
    answer = (answer + nums[n - 1 - index] * count) % MOD;
  }
  return answer;
};
