/**
 * Minimum Number of Increasing Subsequence to Be Removed
 * Intuition: Covering the array with strictly increasing subsequences equals the length of the longest non-increasing subsequence (Dilworth). Reverse the array and take LIS allowing equals.
 * Approach: 1. Reverse nums. 2. Maintain tails of non-decreasing subsequences via patience sorting. 3. For each value, append if it is >= last tail, else replace the first tail strictly greater than it. 4. Return tails.length.
 * Dry Run: nums = [4, 3, 1, 2], reversed [2, 1, 3, 4]. tails: [2] -> [1] -> [1, 3] -> [1, 3, 4]. Length 3.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minOperations = function (nums) {
  const reversedNums = nums.slice().reverse();
  const tails = [];

  const firstGreater = (target) => {
    let left = 0;
    let right = tails.length;
    while (left < right) {
      const mid = (left + right) >> 1;
      if (tails[mid] > target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  };

  for (const value of reversedNums) {
    if (tails.length === 0 || value >= tails[tails.length - 1]) {
      tails.push(value);
    } else {
      tails[firstGreater(value)] = value;
    }
  }

  return tails.length;
};
