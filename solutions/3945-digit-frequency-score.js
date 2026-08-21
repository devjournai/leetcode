/**
 * Digit Frequency Score
 * Intuition: The problem is equivalent to finding the sum of each digit of a number. We can obtain each digit by repeatedly taking the modulus and dividing by 10, and accumulate the result.
 * Approach: 1. Follow Simulation. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: n = 122. Output: 5.
 * Time Complexity: O(logn)
 * Space Complexity: O(1)
 */
var digitFrequencyScore = function (n) {
  let ans = 0;
  for (; n; n = Math.floor(n / 10)) {
    ans += n % 10;
  }
  return ans;
};
