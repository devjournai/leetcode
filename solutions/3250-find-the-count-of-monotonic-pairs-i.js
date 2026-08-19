/**
 * Find the Count of Monotonic Pairs I
 * Intuition: arr1 is non-decreasing, arr2 is non-increasing, and arr1[i] + arr2[i] = nums[i]. Choosing arr1[i] = value forces arr2[i] = nums[i] - value, so transitions on arr1 values can be DP'd.
 * Approach: 1. dp[i][value] = ways to fill up to i with arr1[i] = value. Initialize dp[0][0..nums[0]] = 1. 2. For each next value, prevValue must be <= min(value, value - (nums[i] - nums[i-1])). 3. That valid prev range grows by at most 1, so accumulate prefix ways while scanning value. Sum dp[n-1].
 * Dry Run: nums = [2, 3, 2]. dp[0] = ways for 0,1,2. After scanning i=1,2 the total ways on the last row is 4.
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
