/**
 * Interleaving String
 * Intuition: s3 is an interleaving of s1 and s2 iff some prefix of s3 can be formed by prefixes of s1 and s2; dp[i][j] means s1[0..i) and s2[0..j) interleave s3[0..i+j).
 * Approach: 1. Reject if lengths do not add up. 2. dp[0][0]=true. 3. Fill first row from s2 only, first column from s1 only. 4. Else dp[i][j] if (take s1 last char matching s3) or (take s2 last char matching s3).
 * Dry Run: s1="aab", s2="axy", s3="aaxaby" → path using a,a from s1 then x,y mixed → true at dp[3][3]
 * Time Complexity: O(s1.length * s2.length)
 * Space Complexity: O(s1.length * s2.length)
 */
var isInterleave = function (s1, s2, s3) {
  const lenS1 = s1.length;
  const lenS2 = s2.length;
  const lenS3 = s3.length;

  if (lenS1 + lenS2 !== lenS3) {
    return false;
  }

  const dpGrid = new Array(lenS1 + 1)
    .fill(false)
    .map(() => new Array(lenS2 + 1).fill(false));

  for (let currentLen1 = 0; currentLen1 <= lenS1; currentLen1++) {
    for (let currentLen2 = 0; currentLen2 <= lenS2; currentLen2++) {
      const combinedCurrentLength = currentLen1 + currentLen2;

      if (currentLen1 === 0 && currentLen2 === 0) {
        dpGrid[currentLen1][currentLen2] = true;
      } else if (currentLen1 === 0) {
        dpGrid[currentLen1][currentLen2] =
          dpGrid[currentLen1][currentLen2 - 1] &&
          s2[currentLen2 - 1] === s3[combinedCurrentLength - 1];
      } else if (currentLen2 === 0) {
        dpGrid[currentLen1][currentLen2] =
          dpGrid[currentLen1 - 1][currentLen2] &&
          s1[currentLen1 - 1] === s3[combinedCurrentLength - 1];
      } else {
        const canTakeFromS1 =
          dpGrid[currentLen1 - 1][currentLen2] &&
          s1[currentLen1 - 1] === s3[combinedCurrentLength - 1];
        const canTakeFromS2 =
          dpGrid[currentLen1][currentLen2 - 1] &&
          s2[currentLen2 - 1] === s3[combinedCurrentLength - 1];
        dpGrid[currentLen1][currentLen2] = canTakeFromS1 || canTakeFromS2;
      }
    }
  }

  return dpGrid[lenS1][lenS2];
};
