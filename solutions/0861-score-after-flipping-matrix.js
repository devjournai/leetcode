/**
 * Score After Flipping Matrix
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
 */
var matrixScore = function (grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;

  for (let currRowIndex = 0; currRowIndex < numRows; currRowIndex++) {
    const firstBitOfRow = grid[currRowIndex][0];
    if (firstBitOfRow === 0) {
      for (let currColIndex = 0; currColIndex < numCols; currColIndex++) {
        grid[currRowIndex][currColIndex] ^= 1;
      }
    }
  }

  let overallScore = 0;

  const initialMsbScore = numRows * (1 << (numCols - 1));
  overallScore += initialMsbScore;

  for (let processColIndex = 1; processColIndex < numCols; processColIndex++) {
    let currentOnesCount = 0;
    for (
      let processRowIndex = 0;
      processRowIndex < numRows;
      processRowIndex++
    ) {
      const currentBitVal = grid[processRowIndex][processColIndex];
      currentOnesCount += currentBitVal;
    }

    const optimizedOnesAmount = Math.max(
      currentOnesCount,
      numRows - currentOnesCount,
    );
    const bitWeight = 1 << (numCols - 1 - processColIndex);

    overallScore += optimizedOnesAmount * bitWeight;
  }

  return overallScore;
};
