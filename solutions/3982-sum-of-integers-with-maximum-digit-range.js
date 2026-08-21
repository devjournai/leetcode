/**
 * Sum of Integers with Maximum Digit Range
 * Intuition: We traverse the array nums. For each integer x, we extract its digits to find the largest digit b and the smallest digit a, then compute the digit range r = b - a. If r is greater than the current maximum digit range mx, we update mx = r and reset the answer to x; if r equals mx, we add x to the answer.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [5724,111,350]. Output: 6074.
 * Time Complexity: O(nlogM)
 * Space Complexity: O(1)
 */
var maxDigitRange = function (nums) {
  let [ans, mx] = [0, 0];
  for (const x of nums) {
    let [a, b] = [10, 0];
    for (let y = x; y; y = (y / 10) | 0) {
      const v = y % 10;
      a = Math.min(a, v);
      b = Math.max(b, v);
    }
    const r = b - a;
    if (mx < r) {
      mx = r;
      ans = x;
    } else if (mx == r) {
      ans += x;
    }
  }
  return ans;
};
