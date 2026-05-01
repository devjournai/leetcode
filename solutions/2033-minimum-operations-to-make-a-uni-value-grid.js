/**
 * Minimum Operations to Make a Uni-Value Grid
 * Time Complexity: O(m * n log(m * n))
 * Space Complexity: O(m * n)
 */
var minOperations = function (grid, x) {
  let flattenedElements = [];
  let rowsCount = grid.length;
  let columnsCount = grid[0].length;

  for (let currentRow = 0; currentRow < rowsCount; ++currentRow) {
    for (let currentColumn = 0; currentColumn < columnsCount; ++currentColumn) {
      flattenedElements.push(grid[currentRow][currentColumn]);
    }
  }

  let totalElementsCount = flattenedElements.length;
  if (totalElementsCount <= 1) {
    return 0;
  }

  let initialModuloRemainder = flattenedElements[0] % x;

  for (
    let currentElementIndex = 1;
    currentElementIndex < totalElementsCount;
    ++currentElementIndex
  ) {
    let elementModulo = flattenedElements[currentElementIndex] % x;
    if (elementModulo !== initialModuloRemainder) {
      return -1;
    }
  }

  const numericSorter = (valueA, valueB) => valueA - valueB;
  flattenedElements.sort(numericSorter);

  let medianIndex = Math.floor(totalElementsCount / 2);
  let targetValue = flattenedElements[medianIndex];
  let aggregateOperations = 0;

  for (
    let traversalIndex = 0;
    traversalIndex < totalElementsCount;
    ++traversalIndex
  ) {
    let currentGridValue = flattenedElements[traversalIndex];
    let absoluteDifference = Math.abs(currentGridValue - targetValue);
    aggregateOperations += absoluteDifference / x;
  }

  return aggregateOperations;
};
