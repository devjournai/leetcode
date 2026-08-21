/**
 * Image Smoother
 * Intuition: Each output cell is the floor of the average of itself and its in-bound 8-neighbors.
 * Approach: 1. Allocate `outputMatrix`. 2. For every cell, sum `img` over row/col deltas in {-1,0,1} that stay in bounds and count them. 3. Write `Math.floor(totalValue / cellCount)`.
 * Dry Run: img=[[1,1,1],[1,0,1],[1,1,1]].
 *   - Corner (0,0) uses four cells summing to 3 → floor(3/4)=0. Center uses 8/9 → 0. Return [[0,0,0],[0,0,0],[0,0,0]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var imageSmoother = function (img) {
  const numberOfRows = img.length;
  const numberOfColumns = img[0].length;

  const outputMatrix = [];
  for (let matrixRow = 0; matrixRow < numberOfRows; matrixRow++) {
    outputMatrix.push(new Array(numberOfColumns));
  }

  for (let currentRow = 0; currentRow < numberOfRows; currentRow++) {
    for (let currentCol = 0; currentCol < numberOfColumns; currentCol++) {
      let totalValue = 0;
      let cellCount = 0;

      for (let rowDelta = -1; rowDelta <= 1; rowDelta++) {
        for (let colDelta = -1; colDelta <= 1; colDelta++) {
          const adjacentRowPosition = currentRow + rowDelta;
          const adjacentColPosition = currentCol + colDelta;

          const rowWithinBounds =
            adjacentRowPosition >= 0 && adjacentRowPosition < numberOfRows;
          const colWithinBounds =
            adjacentColPosition >= 0 && adjacentColPosition < numberOfColumns;

          if (rowWithinBounds && colWithinBounds) {
            totalValue += img[adjacentRowPosition][adjacentColPosition];
            cellCount++;
          }
        }
      }
      outputMatrix[currentRow][currentCol] = Math.floor(totalValue / cellCount);
    }
  }

  return outputMatrix;
};
