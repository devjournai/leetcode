/**
 * Shift 2d Grid
 * Intuition: A 2D shift of k is a rotation of the flattened m*n array by k mod mn. Map each (r,c) to a new flat index and write into a new grid.
 * Approach: 1. actualShiftsNeeded = k % (rows*cols). 2. For every original cell, newIndex = (flat+shifts)%count. 3. Decode new row/col and copy the value. 4. Return newlyArrangedGrid.
 * Dry Run: grid=[[1,2,3],[4,5,6],[7,8,9]], k=1
 *   flat 0..8 become 1..8,0. Result [[9,1,2],[3,4,5],[6,7,8]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var shiftGrid = function (grid, k) {
  const totalRows = grid.length;
  const totalColumns = grid[0].length;
  const allElementsCount = totalRows * totalColumns;

  const actualShiftsNeeded = k % allElementsCount;

  const newlyArrangedGrid = Array(totalRows)
    .fill(null)
    .map(() => Array(totalColumns).fill(0));

  for (let originalRow = 0; originalRow < totalRows; originalRow++) {
    for (
      let originalColumn = 0;
      originalColumn < totalColumns;
      originalColumn++
    ) {
      const flatOriginalIndex = originalRow * totalColumns + originalColumn;
      const flatShiftedIndex =
        (flatOriginalIndex + actualShiftsNeeded) % allElementsCount;

      const newGridRow = Math.floor(flatShiftedIndex / totalColumns);
      const newGridColumn = flatShiftedIndex % totalColumns;

      newlyArrangedGrid[newGridRow][newGridColumn] =
        grid[originalRow][originalColumn];
    }
  }

  return newlyArrangedGrid;
};
