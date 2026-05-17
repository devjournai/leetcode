/**
 * Convert 1d Array Into 2d Array
 * Intuition: To form a 2D array from a 1D array, the total number of elements must match the target dimensions. We can construct the 2D array row by row, taking `n` elements from the 1D array for each row.
 * Approach: 1. Calculate the total required elements (`m * n`). If this count does not match the length of the `original` array, return an empty array as it's impossible to form the 2D array. 2. Initialize an empty array, `reshapedMatrix`, to store the 2D result. 3. Use a `while` loop to iterate `m` times, managing a `rowIdentifier` variable starting from zero. 4. In each iteration, calculate the `startIndex` and `endIndex` in the `original` array to extract the elements for the current row (`rowIdentifier * n` and `(rowIdentifier + 1) * n` respectively). 5. Use `original.slice()` to obtain this segment of `n` elements. 6. Add the obtained segment as a new row to `reshapedMatrix`. 7. Increment `rowIdentifier`. 8. After the loop completes, return `reshapedMatrix`.
 * Dry Run: original = [1,2,3,4], m = 2, n = 2
 *   1. originalLength = 4. totalCapacity = m * n = 2 * 2 = 4. originalLength === totalCapacity (4 === 4), so proceed.
 *   2. reshapedMatrix = [].
 *   3. rowIdentifier = 0.
 *   4. While loop (rowIdentifier < m):
 *      - rowIdentifier = 0 (0 < 2 is true):
 *        - startIndex = 0 * 2 = 0.
 *        - endIndex = (0 + 1) * 2 = 2.
 *        - currentSegment = original.slice(0, 2) => [1, 2].
 *        - reshapedMatrix.push([1, 2]) => [[1, 2]].
 *        - rowIdentifier becomes 1.
 *      - rowIdentifier = 1 (1 < 2 is true):
 *        - startIndex = 1 * 2 = 2.
 *        - endIndex = (1 + 1) * 2 = 4.
 *        - currentSegment = original.slice(2, 4) => [3, 4].
 *        - reshapedMatrix.push([3, 4]) => [[1, 2], [3, 4]].
 *        - rowIdentifier becomes 2.
 *      - rowIdentifier = 2 (2 < 2 is false). Loop terminates.
 *   5. Return reshapedMatrix => [[1, 2], [3, 4]].
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var construct2DArray = function (original, m, n) {
  const originalLength = original.length;
  const totalExpectedElements = m * n;

  if (originalLength !== totalExpectedElements) {
    return [];
  }

  const reshapedMatrix = [];
  let rowIdentifier = 0;

  while (rowIdentifier < m) {
    const rowStartingIndex = rowIdentifier * n;
    const rowEndingIndex = (rowIdentifier + 1) * n;
    const currentSegment = original.slice(rowStartingIndex, rowEndingIndex);
    reshapedMatrix.push(currentSegment);
    rowIdentifier = rowIdentifier + 1;
  }

  return reshapedMatrix;
};
