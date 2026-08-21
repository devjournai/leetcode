/**
 * Maximum Value Sum by Placing Three Rooks II
 * Intuition: Same placement rule as Three Rooks I, with a larger board. The optimal three cells still come from the intersection of per-row and per-column top-3 lists.
 * Approach: 1. Collect the 3 largest cells in each row and each column. 2. Intersect those sets and keep the 9 largest cells. 3. Brute-force triples with distinct rows and columns and return the maximum sum.
 * Dry Run:
 *   A 3x3 board of all 1s except a 5 on the diagonal yields candidate triples whose best non-attacking sum is 5+1+1 = 7 when the 5 is included with two 1s off its row and column.
 * Time Complexity: O(m n)
 * Space Complexity: O(m + n)
 */
var maximumValueSum = function (board) {
  const m = board.length;
  const n = board[0].length;

  const topK = (cells, k) => {
    cells.sort((a, b) => b[0] - a[0] || a[1] - b[1] || a[2] - b[2]);
    return cells.slice(0, k);
  };

  const rowSet = new Set();
  const colSet = new Set();

  for (let i = 0; i < m; i++) {
    const rowCells = [];
    for (let j = 0; j < n; j++) {
      rowCells.push([board[i][j], i, j]);
    }
    for (const cell of topK(rowCells, 3)) {
      rowSet.add(cell.join(","));
    }
  }

  for (let j = 0; j < n; j++) {
    const colCells = [];
    for (let i = 0; i < m; i++) {
      colCells.push([board[i][j], i, j]);
    }
    for (const cell of topK(colCells, 3)) {
      colSet.add(cell.join(","));
    }
  }

  const intersection = [];
  for (const key of rowSet) {
    if (colSet.has(key)) {
      const [val, i, j] = key.split(",").map(Number);
      intersection.push([val, i, j]);
    }
  }

  const topNine = topK(intersection, 9);
  let ans = -Infinity;

  for (let a = 0; a < topNine.length; a++) {
    for (let b = a + 1; b < topNine.length; b++) {
      for (let c = b + 1; c < topNine.length; c++) {
        const [val1, i1, j1] = topNine[a];
        const [val2, i2, j2] = topNine[b];
        const [val3, i3, j3] = topNine[c];
        if (
          i1 === i2 ||
          i1 === i3 ||
          i2 === i3 ||
          j1 === j2 ||
          j1 === j3 ||
          j2 === j3
        ) {
          continue;
        }
        ans = Math.max(ans, val1 + val2 + val3);
      }
    }
  }

  return ans;
};
