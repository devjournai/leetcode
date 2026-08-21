/**
 * Spiral Matrix III
 * Intuition: From `(startRow, startCol)` walk east then south with step length 1, west then north with length 2, and so on—two segments per length, then increment length. Record only cells inside the grid until `rows*cols` coordinates are collected.
 * Approach: 1. Directions `[0,1],[1,0],[0,-1],[-1,0]`. Push the start cell. 2. While output size < totalCells, run two segments: walk `currentStepLength` steps, then rotate. 3. After the pair of segments, increment step length. 4. Return `outputCoordinates`.
 * Dry Run: rows = 1, cols = 4, start = (0,0).
 *   - Record (0,0). East 1: (0,1). South 1: (1,0) off-grid. West 2: (1,-1) off, (0,-1) off. North 2: off, then would continue until (0,2),(0,3) fill the row. Result [[0,0],[0,1],[0,2],[0,3]].
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
