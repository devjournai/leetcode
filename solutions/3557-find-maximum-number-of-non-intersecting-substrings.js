/**
 * Find Maximum Number of Non Intersecting Substrings
 * Intuition: A valid substring starts and ends with the same letter and has length at least 4. Greedily taking the earliest possible end for each letter maximizes how many disjoint pieces we can pack.
 * Approach: 1. Remember the first index of each character in the current free prefix. 2. When we see the same letter at index i with i - first + 1 >= 4, take one substring and clear the map (next pieces must start after i). 3. Count taken pieces.
 * Dry Run: word = "abcdeafdef". First 'a' at 0, later 'a' at 5 → take "abcdea". Map clears. Then 'f' at 6 and 9 → take "fdef". Answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSubstrings = function (word) {
  let answer = 0;
  const firstSeen = new Map();

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    if (!firstSeen.has(char)) {
      firstSeen.set(char, i);
    } else if (i - firstSeen.get(char) + 1 >= 4) {
      answer++;
      firstSeen.clear();
    }
  }

  return answer;
};
