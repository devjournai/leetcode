/**
 * Minimum Length of String After Operations
 * Intuition: For each letter we can keep deleting a copy that has that letter on both sides until at most 1 (odd count) or 2 (even count) copies remain.
 * Approach: 1. Count frequencies of a-z. 2. For each positive frequency add 1 if odd else 2. 3. Sum those remainders.
 * Dry Run:
 *   s = "abaacbcbb"
 *   a:3 -> 1, b:4 -> 2, c:2 -> 2, total 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumLength = function (s) {
  const letterCounts = Array(26).fill(0);
  for (const character of s) {
    letterCounts[character.charCodeAt(0) - 97]++;
  }

  let remainingLength = 0;
  for (const frequency of letterCounts) {
    if (frequency > 0) {
      remainingLength += frequency % 2 === 0 ? 2 : 1;
    }
  }
  return remainingLength;
};
