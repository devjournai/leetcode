/**
 * Vowels Game in a String
 * Intuition: Alice removes a substring with an odd number of vowels. If there is at least one vowel she can always force a win: take the whole string when the count is odd, or all but one vowel when it is even.
 * Approach: 1. Scan s for any of a, e, i, o, u. 2. Return true as soon as one vowel is found (Alice wins). 3. If none exist, Bob wins.
 * Dry Run: s = "leetcoder". Vowels exist, so Alice wins. s = "bbcd" has no vowels, Bob wins.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var doesAliceWin = function (s) {
  const vowels = new Set(["a", "e", "i", "o", "u"]);
  for (const character of s) {
    if (vowels.has(character)) {
      return true;
    }
  }
  return false;
};
