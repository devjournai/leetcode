/**
 * Maximize Expression of Three Elements
 * Intuition: According to the problem description, we need to choose three elements a, b, and c at distinct indices such that the value of the expression a + b - c is maximized.
 * Approach: We only need to traverse the array to find the largest two elements a and b and the smallest element c. Then we can calculate the value of the expression. The time complexity is O(n), where n is the length of the array. The space complexity is O(1).
 * Dry Run: Input nums = [1,4,2,5]. Output 8.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximizeExpressionOfThree = function (nums) {
  const inf = 1 << 30;
  let [a, b, c] = [-inf, -inf, inf];

  for (const x of nums) {
    if (x < c) {
      c = x;
    }
    if (x >= a) {
      b = a;
      a = x;
    } else if (x > b) {
      b = x;
    }
  }
  return a + b - c;
};
