/**
 * Score After Flipping Matrix
 * Intuition: MSB of each row should be 1 (flip the row if needed). Then for other columns, flip if that would create more 1s; score is ones_in_col * 2^(cols-1-j).
 * Approach: 1. For each row with grid[r][0]==0, XOR the whole row. 2. Add `numRows * 2^(cols-1)` for column 0. 3. For col j≥1, ones = max(count, rows-count) times bit weight. 4. Return score.
 * Dry Run: [[0,0,1,1],[1,0,1,0],[1,1,0,0]]. Flip row0 → [[1,1,0,0],...]. Col0: 3*8=24. Later cols take max ones. Total 39.
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
      numRows - currentOnesCount
    );
    const bitWeight = 1 << (numCols - 1 - processColIndex);

    overallScore += optimizedOnesAmount * bitWeight;
  }

  return overallScore;
};
