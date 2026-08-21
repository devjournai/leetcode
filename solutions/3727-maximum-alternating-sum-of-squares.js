/**
 * Maximum Alternating Sum of Squares
 * Intuition: We can sort the elements of the array by their squared values, then place the elements with larger squared values at even indices and those with smaller squared values at odd indices.
 * Approach: The final alternating score is the sum of the squared values of the larger elements minus the sum of the squared values of the smaller elements, that is, the sum of the squares of the latter half of the sorted array \text{nums} minus the sum of the squares of the first half. The time complexity is O(n \log n) and the space complexity is O(\log n), where n is the length of the array.
 * Dry Run: Input nums = [1,2,3]. Output 12.
 * Time Complexity: O(n \log n)
 * Space Complexity: O(\log n)
 */
var maxAlternatingSum = function (nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    nums[i] = nums[i] ** 2;
  }
  nums.sort((a, b) => a - b);
  const m = Math.floor(n / 2);
  let ans = 0;
  for (let i = 0; i < m; i++) {
    ans -= nums[i];
  }
  for (let i = m; i < n; i++) {
    ans += nums[i];
  }
  return ans;
};
