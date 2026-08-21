/**
 * Maximize Consecutive Elements in an Array After Modification
 * Intuition: Each value may stay the same or increase by 1, and each original element can be used at most once. After sorting, process values in order and keep the longest consecutive run ending at the current number and at current+1.
 * Approach: 1. Sort nums. 2. Maintain a map from value to the longest consecutive length ending at that value. 3. For each number, first set dp[num + 1] = dp[num] + 1 (increment this element), then set dp[num] = dp[num - 1] + 1 (keep it). 4. Track the maximum of those two lengths.
 * Dry Run: nums = [2, 1, 5, 1, 1]. Sorted [1, 1, 1, 2, 5]. First 1: dp[2]=1, dp[1]=1. Second 1: dp[2]=2, dp[1]=1. Third 1: dp[2]=2, dp[1]=1. Then 2: dp[3]=3, dp[2]=2. Then 5: dp[6]=1, dp[5]=1. Answer 3 (1,2,3).
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxSelectedElements = function (nums) {
  nums.sort((leftValue, rightValue) => leftValue - rightValue);

  const longestEndingAtValue = new Map();
  let longestConsecutiveLength = 0;

  for (const currentValue of nums) {
    longestEndingAtValue.set(
      currentValue + 1,
      (longestEndingAtValue.get(currentValue) || 0) + 1
    );
    longestEndingAtValue.set(
      currentValue,
      (longestEndingAtValue.get(currentValue - 1) || 0) + 1
    );
    longestConsecutiveLength = Math.max(
      longestConsecutiveLength,
      longestEndingAtValue.get(currentValue),
      longestEndingAtValue.get(currentValue + 1)
    );
  }

  return longestConsecutiveLength;
};
