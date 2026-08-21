/**
 * Rotating the Box
 * Intuition: Gravity pulls stones ('#') right, then the box rotates 90° clockwise. Simulate fall in each original row using a write pointer, mapping (r,c) → (c, m-1-r).
 * Approach: 1. Allocate `rotatedBoxState` of size width×height filled with '.'. 2. For each original row, scan columns right-to-left: '*' lands in place and resets `availablePlacementRow`; '#' falls to that row then the pointer decrements. 3. Return the rotated grid.
 * Dry Run: [["#",".","#"]]. Stones fall right then rotate 90° clockwise to [["."],["#"],["#"]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(n * m)
 */
var rotateTheBox = function (inputMatrix) {
  const originalHeight = inputMatrix.length;
  const originalWidth = inputMatrix[0].length;

  const rotatedBoxState = Array.from({ length: originalWidth }, () =>
    new Array(originalHeight).fill(".")
  );

  let currentOriginalRow = 0;
  while (currentOriginalRow < originalHeight) {
    let availablePlacementRow = originalWidth - 1;
    let currentOriginalCol = originalWidth - 1;

    while (currentOriginalCol >= 0) {
      const currentCellContent =
        inputMatrix[currentOriginalRow][currentOriginalCol];

      if (currentCellContent === "*") {
        const newColumnIndex = originalHeight - 1 - currentOriginalRow;
        rotatedBoxState[currentOriginalCol][newColumnIndex] = "*";
        availablePlacementRow = currentOriginalCol - 1;
      } else if (currentCellContent === "#") {
        const newColumnIndex = originalHeight - 1 - currentOriginalRow;
        rotatedBoxState[availablePlacementRow][newColumnIndex] = "#";
        availablePlacementRow--;
      }
      currentOriginalCol--;
    }
    currentOriginalRow++;
  }

  return rotatedBoxState;
};
