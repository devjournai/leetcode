/**
 * Check Good Integer
 * Intuition: We use a variable s to record the result of the square sum minus the digit sum of n. If s is greater than or equal to 50, we return true; otherwise, we return false.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: n = 1000. Output: false.
 * Time Complexity: O(logn)
 * Space Complexity: O(1)
 */
var checkGoodInteger = function (n) {
  let s = 0;
  for (; n; n = Math.floor(n / 10)) {
    const x = n % 10;
    s += x * (x - 1);
  }
  return s >= 50;
};
