/**
 * Count Subarrays With Even Odd Ratio I
 * Intuition: We enumerate the left endpoint i of the subarray, then extend the right endpoint j to the right while maintaining the count of odd numbers y in the subarray. The count of even numbers is then x = j - i + 1 - y.
 * Approach: We enumerate the left endpoint i of the subarray, then extend the right endpoint j to the right while maintaining the count of odd numbers y in the subarray. The count of even numbers is then x = j - i + 1 - y. If y > 0 and frac{x}{y} le frac{a}{b}, the subarray is valid. To avoid precision issues from floating-point arithmetic, we can transform the condition into the equivalent integer comparison x  *  b le y  *  a.
 * Dry Run: Input: nums = [1,2,1,2], a = 3, b = 2. Output: 7.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var countRatioSubarrays = function (nums, a, b) {
  const n = nums.length;
  let ans = 0;

  for (let i = 0; i < n; i++) {
    let y = 0;

    for (let j = i; j < n; j++) {
      y += nums[j] % 2;
      const x = j - i + 1 - y;

      if (y > 0 && x * b <= y * a) {
        ans++;
      }
    }
  }

  return ans;
};
