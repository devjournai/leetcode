/**
 * Find the Count of Monotonic Pairs II
 * Intuition: Same recurrence as Monotonic Pairs I: arr1 non-decreasing, arr2 non-increasing, arr1[i] + arr2[i] = nums[i]. Larger nums[i] still fits in an O(n * max) DP.
 * Approach: 1. dp[i][value] = ways with arr1[i] = value. 2. Valid previous arr1 values are prev <= min(value, value - (nums[i] - nums[i-1])), and that bound grows by at most 1. 3. Accumulate those ways while scanning value and sum the last row modulo 1e9+7.
 * Dry Run: nums = [2, 3, 2] yields 4 pairs, identical to part I on this input.
 * Time Complexity: O(n * max(nums))
 * Space Complexity: O(n * max(nums))
 */
var countOfPairs = function (nums) {
  const MOD = 1e9 + 7;
  const MAX_VALUE = 1000;
  const length = nums.length;
  const waysForValue = Array.from({ length }, () =>
    Array(MAX_VALUE + 1).fill(0),
  );

  for (let value = 0; value <= nums[0]; value++) {
    waysForValue[0][value] = 1;
  }

  for (let index = 1; index < length; index++) {
    let prefixWays = 0;
    let previousValue = 0;
    for (let value = 0; value <= nums[index]; value++) {
      if (
        previousValue <=
        Math.min(value, value - (nums[index] - nums[index - 1]))
      ) {
        prefixWays =
          (prefixWays + waysForValue[index - 1][previousValue]) % MOD;
        previousValue++;
      }
      waysForValue[index][value] = prefixWays;
    }
  }

  let pairCount = 0;
  for (let value = 0; value <= MAX_VALUE; value++) {
    pairCount = (pairCount + waysForValue[length - 1][value]) % MOD;
  }
  return pairCount;
};
