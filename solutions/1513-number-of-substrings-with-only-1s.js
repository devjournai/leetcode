/**
 * Number Of Substrings With Only 1s
 * Intuition: A run of k ones contributes k(k+1)/2 substrings; each new 1 adds the current streak length.
 * Approach: 1. Walk s; on '1' increment streak and add it mod 1e9+7. 2. On '0' reset streak.
 * Dry Run: s = "0110111".
 *   - Runs of 2 and 3 ones contribute 3+6=9.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numSub = function (s) {
  const moduloValue = 1000000007;
  let totalSubstrings = 0;
  let currentStreak = 0;

  for (let stringIndex = 0; stringIndex < s.length; stringIndex++) {
    const characterValue = s[stringIndex];
    if (characterValue === "1") {
      currentStreak++;
      totalSubstrings = (totalSubstrings + currentStreak) % moduloValue;
    } else {
      currentStreak = 0;
    }
  }

  return totalSubstrings;
};
