/**
 * Knight Probability In Chessboard
 * Time Complexity: O(k * n^2)
 * Space Complexity: O(k * n^2)
 */
var knightProbability = function (n, k, row, column) {
  const knightStepOffsets = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  const probabilityGrid = Array(k + 1)
    .fill(0)
    .map(() =>
      Array(n)
        .fill(0)
        .map(() => Array(n).fill(0)),
    );

  probabilityGrid[0][row][column] = 1.0;

  for (let currentStep = 0; currentStep < k; currentStep++) {
    for (let rowIndex = 0; rowIndex < n; rowIndex++) {
      for (let colIndex = 0; colIndex < n; colIndex++) {
        if (probabilityGrid[currentStep][rowIndex][colIndex] > 0) {
          for (const [deltaRow, deltaColumn] of knightStepOffsets) {
            const nextRowPosition = rowIndex + deltaRow;
            const nextColPosition = colIndex + deltaColumn;

            if (
              nextRowPosition >= 0 &&
              nextRowPosition < n &&
              nextColPosition >= 0 &&
              nextColPosition < n
            ) {
              probabilityGrid[currentStep + 1][nextRowPosition][
                nextColPosition
              ] += probabilityGrid[currentStep][rowIndex][colIndex] / 8.0;
            }
          }
        }
      }
    }
  }

  let totalProbability = 0;
  for (let rowIndexFinal = 0; rowIndexFinal < n; rowIndexFinal++) {
    for (let colIndexFinal = 0; colIndexFinal < n; colIndexFinal++) {
      totalProbability += probabilityGrid[k][rowIndexFinal][colIndexFinal];
    }
  }

  return totalProbability;
};
