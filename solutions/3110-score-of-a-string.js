/**
 * Score Of A String
 * Intuition: The score is defined as the sum of absolute ASCII differences between every pair of adjacent characters, so a single linear scan is enough.
 * Approach: 1. Initialize `score` to 0. 2. For each index `i` from 1 to n-1, add `|s[i] - s[i-1]|`. 3. Return the sum.
 * Dry Run:
 * Input: s = "hello"
 * 1. |e-h| = 3
 * 2. |l-e| = 7
 * 3. |l-l| = 0
 * 4. |o-l| = 3
 * 5. Score = 13
 * Time Complexity: O(n)
 * Space Complexity: O(1).
 */
var scoreOfString = function (s) {
  let adjacentDifferenceScore = 0;
  for (let charIndex = 1; charIndex < s.length; charIndex++) {
    adjacentDifferenceScore += Math.abs(
      s.charCodeAt(charIndex) - s.charCodeAt(charIndex - 1)
    );
  }
  return adjacentDifferenceScore;
};
