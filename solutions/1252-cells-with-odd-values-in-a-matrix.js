/**
 * Cells With Odd Values In A Matrix
 * Intuition: Incrementing a row and column adds 1 to every cell in that row/col. Cell (r,c) is odd iff rowIncrementCounts[r] + colIncrementCounts[c] is odd.
 * Approach: 1. Count increments per row and per column from indices. 2. Scan all n*m cells and count those whose combined increment is odd. 3. Return finalOddCells.
 * Dry Run: n=2, m=3, indices=[[0,1],[1,1]]
 *   rowInc=[1,1], colInc=[0,2,0]
 *   cells: (0,0) 1 odd, (0,1) 3 odd, (0,2) 1 odd, (1,0) 1 odd, (1,1) 3 odd, (1,2) 1 odd. Return 6.
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
