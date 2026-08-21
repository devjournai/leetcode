/**
 * Maximum Product of Three Elements After One Replacement
 * Intuition: According to the problem description, we can replace one element in the array with any integer in the range [-10^5, 10^5]. To maximize the product of three elements, we can consider the following cases:
 * Approach: 1. Select the two smallest elements in the array and replace the third element with 10^5. 2. Select the two largest elements in the array and replace the third element with 10^5. 3. Select the smallest element and the two largest elements in the array, and replace the middle element with -10^5. The maximum product among these three cases is the answer. Therefore, we can first sort the array, then calculate the products for the above three cases, and return the maximum value among them. The time complexity is O(n \log n) and the space complexity is O(\log n), where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [-5,7,0]. Output 3500000.
 * Time Complexity: O(n \log n)
 * Space Complexity: O(\log n)
 */
var maxProduct = function (nums) {
  nums.sort((a, b) => a - b);
  const n = nums.length;
  const [a, b] = [nums[0], nums[1]];
  const [c, d] = [nums[n - 2], nums[n - 1]];
  const x = 100000;
  return Math.max(a * b * x, c * d * x, -a * d * x);
};
