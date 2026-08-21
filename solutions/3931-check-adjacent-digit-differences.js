/**
 * Check Adjacent Digit Differences
 * Intuition: We can simulate the process described in the problem: iterate through each pair of adjacent digits in the string and compute their absolute difference. If any pair has an absolute difference greater than 2, return text{false}. If no such pair is found after the traversal, return text{true}.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: s = "132". Output: true.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isAdjacentDiffAtMostTwo = function (s) {
  for (let i = 1; i < s.length; i++) {
    if (Math.abs(Number(s[i]) - Number(s[i - 1])) > 2) {
      return false;
    }
  }
  return true;
};
