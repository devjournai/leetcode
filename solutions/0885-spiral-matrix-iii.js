/**
 * Spiral Matrix III
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var spiralMatrixIII = function (rowsInput, colsInput, startRow, startCol) {
  const outputCoordinates = [];
  const totalCells = rowsInput * colsInput;
  let currentRow = startRow;
  let currentCol = startCol;
  let currentStepLength = 1;
  let currentDirectionIndex = 0;
  const movementVectors = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  outputCoordinates.push([currentRow, currentCol]);

  while (outputCoordinates.length < totalCells) {
    for (let segmentIteration = 0; segmentIteration < 2; segmentIteration++) {
      const [deltaRow, deltaCol] = movementVectors[currentDirectionIndex];
      for (
        let stepIteration = 0;
        stepIteration < currentStepLength;
        stepIteration++
      ) {
        currentRow += deltaRow;
        currentCol += deltaCol;
        if (
          currentRow >= 0 &&
          currentRow < rowsInput &&
          currentCol >= 0 &&
          currentCol < colsInput
        ) {
          outputCoordinates.push([currentRow, currentCol]);
        }
      }
      currentDirectionIndex = (currentDirectionIndex + 1) % 4;
    }
    currentStepLength++;
  }

  return outputCoordinates;
};
