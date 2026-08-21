/**
 * Longest Subsequence With Decreasing Adjacent Difference
 * Intuition: Adjacent absolute differences must be non-increasing along the subsequence. dp[value][diff] = longest subsequence ending at `value` whose last adjacent difference is at least `diff` after a suffix-max sweep.
 * Approach: 1. Let mx be max(nums). 2. For each num, for every prev in 1..mx set dp[num][|num-prev|] = max(that, dp[prev][|num-prev|] + 1). 3. Suffix-max the row so dp[num][j] = max of dp[num][j..mx]. 4. Answer is max dp[*][0].
 * Dry Run: nums = [16,6,3]. Pairs 16-6 diff 10 then 6-3 diff 3, decreasing. Length 3.
 * Time Complexity: O(N * MAX)
 * Space Complexity: O(MAX^2)
 */

var longestSubsequence = function (nums) {
  const maximumValue = Math.max(...nums);
  const longestEnding = Array.from({ length: maximumValue + 1 }, () =>
    new Array(maximumValue + 1).fill(0)
  );

  for (const currentValue of nums) {
    for (
      let previousValue = 1;
      previousValue <= maximumValue;
      previousValue++
    ) {
      const adjacentDifference = Math.abs(currentValue - previousValue);
      longestEnding[currentValue][adjacentDifference] = Math.max(
        longestEnding[currentValue][adjacentDifference],
        longestEnding[previousValue][adjacentDifference] + 1
      );
    }
    for (let difference = maximumValue - 1; difference >= 0; difference--) {
      longestEnding[currentValue][difference] = Math.max(
        longestEnding[currentValue][difference],
        longestEnding[currentValue][difference + 1]
      );
    }
  }

  let longestLength = 0;
  for (let value = 0; value <= maximumValue; value++) {
    longestLength = Math.max(longestLength, longestEnding[value][0]);
  }
  return longestLength;
};
