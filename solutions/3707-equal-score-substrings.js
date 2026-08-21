/**
 * Equal Score Substrings
 * Intuition: Letter score is position in the alphabet. A split is balanced when prefix score equals suffix score, i.e. prefix equals half the total.
 * Approach: 1. Total score of s. 2. Sweep, moving score from right to left. 3. Return true if they meet before the last character.
 * Dry Run: If some proper prefix has the same score as the rest, return true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var scoreBalance = function (s) {
  let leftScore = 0;
  let rightScore = 0;
  for (const char of s) {
    rightScore += char.charCodeAt(0) - 96;
  }
  for (let i = 0; i < s.length - 1; i++) {
    const letterScore = s.charCodeAt(i) - 96;
    leftScore += letterScore;
    rightScore -= letterScore;
    if (leftScore === rightScore) {
      return true;
    }
  }
  return false;
};
