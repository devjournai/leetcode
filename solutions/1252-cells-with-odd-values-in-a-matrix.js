/**
 * Cells With Odd Values In A Matrix
 * Time Complexity: O(L + N * M)
 * Space Complexity: O(N + M)
 */
var oddCells = function (n, m, indices) {
  const rowIncrementCounts = new Array(n).fill(0);
  const colIncrementCounts = new Array(m).fill(0);

  for (let indexVal = 0; indexVal < indices.length; indexVal++) {
    const coordinatePair = indices[indexVal];
    const affectedRow = coordinatePair[0];
    const affectedColumn = coordinatePair[1];

    rowIncrementCounts[affectedRow]++;
    colIncrementCounts[affectedColumn]++;
  }

  let finalOddCells = 0;

  for (let rowIterator = 0; rowIterator < n; rowIterator++) {
    for (let colIterator = 0; colIterator < m; colIterator++) {
      const combinedValue =
        rowIncrementCounts[rowIterator] + colIncrementCounts[colIterator];
      if (combinedValue % 2 !== 0) {
        finalOddCells++;
      }
    }
  }

  return finalOddCells;
};
