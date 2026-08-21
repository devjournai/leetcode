/**
 * Generate A String With Characters That Have Odd Counts
 * Intuition: Every character must appear an odd number of times. If n is odd, n copies of 'a' works. If n is even, n-1 'a's (odd) plus one 'b' (odd) works.
 * Approach: 1. If n is odd, return "a".repeat(n). 2. Otherwise return "a".repeat(n-1) + "b".
 * Dry Run: n = 4.
 *   - Even, so "aaa" + "b" = "aaab". Each letter has odd count.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var generateTheString = function (n) {
  if (n % 2 === 1) {
    let firstResultString = "";
    firstResultString = "a".repeat(n);
    return firstResultString;
  } else {
    let secondResultString = "";
    secondResultString = "a".repeat(n - 1) + "b";
    return secondResultString;
  }
};
