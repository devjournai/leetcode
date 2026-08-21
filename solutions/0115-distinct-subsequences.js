/**
 * Distinct Subsequences
 * Intuition: dp[j] is ways to form target[0..j) from the source prefix seen so far. Matching the current source char with target[j] adds the ways that already formed the shorter prefix.
 * Approach: 1. 1D array size targetLen+1; dp[0] = 1. 2. For each source char, scan target indices from right to left. 3. On a match, dp[j+1] += dp[j]. Right-to-left avoids using the same source char twice in one pass. Return dp[targetLen].
 * Dry Run: source = "rabbbit", target = "rabbit". After processing letters, dp for "rabbit" ends at 3 (three ways to pick two of the three b’s).
 * Time Complexity: O(sourceString.length * targetString.length)
 * Space Complexity: O(targetString.length)
 */
var numDistinct = function (sourceString, targetString) {
  var sourceLen = sourceString.length;
  var targetLen = targetString.length;

  var distinctSubsequenceCounts = new Array(targetLen + 1).fill(0);
  distinctSubsequenceCounts[0] = 1;

  for (var sourcePointer = 0; sourcePointer !== sourceLen; ++sourcePointer) {
    for (
      var targetPointer = targetLen - 1;
      targetPointer > -1;
      --targetPointer
    ) {
      if (sourceString[sourcePointer] === targetString[targetPointer]) {
        distinctSubsequenceCounts[targetPointer + 1] +=
          distinctSubsequenceCounts[targetPointer];
      }
    }
  }

  return distinctSubsequenceCounts[targetLen];
};
