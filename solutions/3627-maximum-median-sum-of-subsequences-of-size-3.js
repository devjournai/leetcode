/**
 * Maximum Median Sum of Subsequences of Size 3
 * Intuition: n is a multiple of 3. Repeatedly taking two large values and one small as a triple maximizes the sum of medians, which are the 2nd-largest in each triple — equivalently every other remaining large element after dropping the n/3 smallest.
 * Approach: 1. Sort. 2. Skip the smallest n/3 values. 3. From the rest, add nums[i] at i = n/3, n/3+2, ...
 * Dry Run: [2,1,3,4,5,6] sorted [1,2,3,4,5,6], start at i=2: 3+5 = 8.
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
var maximumMedianSum = function (nums) {
  nums.sort((left, right) => left - right);
  const length = nums.length;
  let answer = 0;
  for (let index = length / 3; index < length; index += 2) {
    answer += nums[index];
  }
  return answer;
};
