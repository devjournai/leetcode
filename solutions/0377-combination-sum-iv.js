/**
 * Combination Sum Iv
 * Intuition: Order matters, so this is permutation-complete knapsack: the number of ways to make sum s is the sum of ways to make s − num for every coin that fits.
 * Approach: 1. `memoizedCounts[0] = 1`, rest 0. 2. For each total 1..target, add counts[total - num] for every num ≤ total. 3. Return counts[target].
 * Dry Run: nums = [1,2,3], target = 4. dp[1]=1, dp[2]=2, dp[3]=4, dp[4]=7.
 * Time Complexity: O(target * nums.length)
 * Space Complexity: O(target)
 */
var combinationSum4 = function (nums, target) {
  const memoizedCounts = new Array(target + 1).fill(0);
  memoizedCounts[0] = 1;

  for (let currentSumTotal = 1; currentSumTotal <= target; currentSumTotal++) {
    for (let currentNumValue of nums) {
      if (currentSumTotal >= currentNumValue) {
        memoizedCounts[currentSumTotal] +=
          memoizedCounts[currentSumTotal - currentNumValue];
      }
    }
  }

  return memoizedCounts[target];
};
