/**
 * Edit Distance
 * Intuition: The cheapest way to turn prefixes of word1 into prefixes of word2 reuses smaller prefixes: matching last characters copies the diagonal, otherwise take min of delete, insert, or replace plus one.
 * Approach: 1. Allocate dp[M+1][N+1]; row 0 is insert-all, column 0 is delete-all. 2. For each pair of prefixes, if the last chars match copy dp[i-1][j-1]; else 1 + min(delete, insert, replace). 3. Answer is dp[M][N].
 * Dry Run: word1="horse", word2="ros" → dp[5][3]: h→r replace, or→o match, rs→s match after insert/delete sequence → 3
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var minDistance = function (word1, word2) {
  const wordOneLen = word1.length;
  const wordTwoLen = word2.length;

  const dpScores = Array(wordOneLen + 1)
    .fill(0)
    .map(() => Array(wordTwoLen + 1));

  for (let firstColIndex = 0; firstColIndex <= wordTwoLen; firstColIndex++) {
    dpScores[0][firstColIndex] = firstColIndex;
  }

  for (let firstRowIndex = 0; firstRowIndex <= wordOneLen; firstRowIndex++) {
    dpScores[firstRowIndex][0] = firstRowIndex;
  }

  for (let mainRowIndex = 1; mainRowIndex <= wordOneLen; mainRowIndex++) {
    for (let mainColIndex = 1; mainColIndex <= wordTwoLen; mainColIndex++) {
      const charFromWord1 = word1[mainRowIndex - 1];
      const charFromWord2 = word2[mainColIndex - 1];

      if (charFromWord1 === charFromWord2) {
        dpScores[mainRowIndex][mainColIndex] =
          dpScores[mainRowIndex - 1][mainColIndex - 1];
      } else {
        const deletionCost = dpScores[mainRowIndex - 1][mainColIndex];
        const insertionCost = dpScores[mainRowIndex][mainColIndex - 1];
        const replacementCost = dpScores[mainRowIndex - 1][mainColIndex - 1];
        dpScores[mainRowIndex][mainColIndex] =
          Math.min(deletionCost, insertionCost, replacementCost) + 1;
      }
    }
  }

  return dpScores[wordOneLen][wordTwoLen];
};
