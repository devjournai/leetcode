/**
 * Minimum Operations to Make a Uni-Value Grid
 * Intuition: All cells can become the same value iff they share the same remainder modulo x. The cheapest common value is the median of the flattened grid.
 * Approach: 1. Flatten the grid. 2. If any value has a different remainder modulo x, return -1. 3. Sort and take the median as the target. 4. Sum |value - median| / x.
 * Dry Run: grid = [[2,4],[6,8]], x = 2. Flatten [2,4,6,8], all even. Median = 6. Ops = (4+2+0+2)/2 = 4.
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
