/**
 * Edit Distance
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
