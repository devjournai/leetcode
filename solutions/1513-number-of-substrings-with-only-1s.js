/**
 * Number Of Substrings With Only 1s
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
