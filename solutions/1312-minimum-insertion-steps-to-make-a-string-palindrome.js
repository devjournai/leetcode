/**
 * Minimum Insertion Steps To Make A String Palindrome
 * Intuition: Insertions needed equal n minus the longest palindromic subsequence. DP on substrings: match ends or insert on one side.
 * Approach: 1. dp[i][j] = min insertions for s[i..j]. 2. If s[i]==s[j], copy dp[i+1][j-1]; else 1+min(dp[i+1][j], dp[i][j-1]). 3. Fill shorter spans first. 4. Return dp[0][n-1].
 * Dry Run: s = "mbadm". Need 2 insertions (e.g. toward "mbdadbm").
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var minInsertions = function (s) {
  const stringSize = s.length;
  const dpTable = new Array(stringSize)
    .fill(0)
    .map(() => new Array(stringSize).fill(0));

  for (
    let initialPosition = stringSize - 2;
    initialPosition >= 0;
    initialPosition--
  ) {
    for (
      let finalPosition = initialPosition + 1;
      finalPosition < stringSize;
      finalPosition++
    ) {
      if (s[initialPosition] === s[finalPosition]) {
        dpTable[initialPosition][finalPosition] =
          dpTable[initialPosition + 1][finalPosition - 1];
      } else {
        dpTable[initialPosition][finalPosition] =
          Math.min(
            dpTable[initialPosition + 1][finalPosition],
            dpTable[initialPosition][finalPosition - 1]
          ) + 1;
      }
    }
  }

  return dpTable[0][stringSize - 1];
};
